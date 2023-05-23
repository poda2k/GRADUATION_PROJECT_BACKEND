const course = require('../DataBase/coursesDetails');
const user = require('../DataBase/mainuserdata');
const cart = require('../DataBase/Analysis');
const payment = require('../DataBase/payment');
const sequelize = require('sequelize');
const mainproduct = require('../DataBase/mainproduct');




let instructor_image;


exports.POSTcourse = async (req, res, next) => {
    const course_name = req.body.course_name;
    const skilled_learn = req.body.skilled_learn;
    const Instructor_name = req.userNAME;
    const course_price = req.body.course_price;
    const course_description = req.body.course_description;
    const level = req.body.level;
    const category = req.body.category;
    const pre = req.body.pre;
    // const image = req.file.path.split('\\').join('/');
    const course_language = req.body.course_language;
    // const Video = req.file.path.split('\\').join('/');
    const total_hours = req.body.total_hours;
    const sections = req.body.sections;
    console.log(sections.length)
    console.log(sections[0].lesson.length)
    let num_lessons = 0;
    for (let i = 0; i < sections.length; i++) {
        num_lessons = num_lessons + sections[i].lesson.length;
    }
    console.log(num_lessons)


    // const topicdetails = await mainproduct.topic.findOne({
    //      where: {
    //         Topic_Name: category
    //      }
    //  })



    const insDeltails = await user.instructor.findOne({
        where: {
            userId: req.userId
        }
    })

    course.course.create({
        course_name: course_name,
        course_price: course_price,
        course_description: course_description,
        course_language: course_language,
        course_rate: 0.0,
        num_student_enrolled: 0,
        level: level,
        // topicId:topicdetails.id,
        Instructor_name: req.userNAME,
        num_sections: sections.length,
        num_lesson: num_lessons,
        course_active: 1,
        admin_active: 0,
        instructorId: insDeltails.id
    }).then(courseresult => {
        // for(let i=0; i<skilled_learn.length; i++) {
        //     course.skillgain.create({
        //         skill_gain_name:skilled_learn[i],
        //         courseId:courseresult.id
        //     })
        // }
        // for(let i=0; i<pre.length; i++) {
        //     course.prereq.create({
        //         pre_name:pre[i],
        //         courseId:courseresult.id
        //     })
        // }
        for (let i = 0; i < sections.length; i++) {
            course.sections.create({
                section_name: sections[i].sectionName,
                courseId: courseresult.id,
                section_lesson: sections[i].lesson.length,
                showLessons: 0
            }).then(sectionresult => {
                for (let j = 0; j < sections[i].lesson.length; j++) {
                    course.lesson.create({
                        lesson_name: sections[i].lesson[j].lessonName,
                        lesson_duration: sections[i].lesson[j].duration,
                        SectionId: sectionresult.id
                    })
                }
            }).catch(error => {
                console.log("error in sectionresult", error);
            })

        }
        function waitTIMER() {
            let count = 1
            return intervalId = setInterval(() => {
                res.json({ massage: "TOP JOB" })
                if (count === 1) {
                    clearInterval(intervalId);
                }
            }, 1000);

        }
        waitTIMER();

    }).catch(err => {
        console.log("error in course creation", err)
    })


}



exports.GETcourse = (req, res) => {
    const id = req.params.courseId;
    course.course.findOne({
        where: {
            id: id
        }
    }).then(coursecontent => {
        if (!coursecontent) {
            const err = new Error('no course found');
            throw err;
        }
        user.instructor.findOne({
            where: {
                id: coursecontent.instructorId
            }
        }).then(result => {

            user.user.findOne({
                where: {
                    id: result.userId
                }
            }).then(result => {
                instructor_image = result.Image_Profile;
                course.skillgain.findAll({
                    where: {
                        courseId: coursecontent.id
                    }
                }).then(result => {
                    res.json({ courseHeader: [coursecontent, { image: instructor_image }, { overview: result }] })
                }).catch(err => {
                    console.log(err);
                })
                // console.log(instructor_image);
                // console.log(result.id)

            })
                .catch(err => {
                    console.log(err)
                })

        }).catch(err => {
            console.log(err)
        })

    }).catch(err => {
        console.log(err)
    })
}

exports.GETcourseSidebarcard = (req, res) => {
    const id = req.params.courseId;
    course.course.findOne({
        where: {
            id: id
        }
    }).then(coursecontent => {
        if (!coursecontent) {
            const err = new Error('no course found');
            throw err;
        }
        user.instructor.findOne({
            where: {
                id: coursecontent.instructorId
            }
        }).then(result => {

            user.user.findOne({
                where: {
                    id: result.userId
                }
            }).then(result => {
                instructor_image = result.Image_Profile;
                course.skillgain.findAll({
                    where: {
                        courseId: coursecontent.id
                    }
                }).then(result => {
                    res.json({ courseSideBarCard: [coursecontent, { image: instructor_image }, { overview: result }] })
                }).catch(err => {
                    console.log(err);
                })
                // console.log(instructor_image);
                // console.log(result.id)

            })
                .catch(err => {
                    console.log(err)
                })

        }).catch(err => {
            console.log(err)
        })

    }).catch(err => {
        console.log(err)
    })
}


exports.GETallcourses = (req, res) => {

    course.course.findAll().then(result => {
        const course_name = result.course_name;
        res.json({ courses: result })
    }).catch(err => {
        console.log(err)
    })
}
exports.Getinstructorconponent = (req, res) => {
    const id = req.params.userId;
    user.user.findOne({
        where: {
            id: id
        }
    }).then(instructorINFO => {
        user.contacttype.findOne({
            where: {
                userId: instructorINFO.id
            }
        }).then(result => {
            if (!result) {
                const err = new Error('no instructor found');
                throw err;
            }

            res.json({ instructorDetails: [instructorINFO, result] })
        }).catch(err => {
            console.log(err);
        })

    })
        .catch(err => {
            console.log(err)
        })
}

exports.Getinstructorprofile = async (req, res) => {

    const id = req.params.userId;

    const userInfo = await user.user.findOne({
        where: {
            id: id
        }
    })
    // .then(userINFO => {
    user.instructor.findOne({
        userId: userInfo.id
    }).then(instructorINFO => {
        course.course.findAll({
            instructorId: instructorINFO.id
        }).then(courseinfo => {
            if (!courseinfo) {
                const err = new Error('no instructor found');
                throw err;
            }
            res.json({ instructorName: [userINFO, instructorINFO, courseinfo] })
        }).catch(err => { console.log(err) })
    }).catch(err => {
        console.log(err)
    })
    // }).catch(err => {
    //     console.log(err)
    // })

}

// TL3 MYTYN ABONA FYHA //

// exports.getcoursedeatails =(req,res) => {
//     const id =req.params.courseid;

//    course.sections.findAll({
//     where : {
//         courseId: id
//     }
//    }).then(sectionob => {
//     for(let i = 0 ; i < sectionob.length; i++){
//         course.lesson.findAll({
//             where: {
//                 SectionId : sectionob[i].id
//             }
//         }).then(lessonob => {
//             // console.log(sectionob[i])
//             // let temp = sectionob[i].section_name;
//             lessonarray[i] = lessonob  ;

//             // console.log(lessonarray[i]);

//         }).catch(err => {
//             console.log(err)
//         })

//     }
//     function waitTIMER(){
//         let count =1 
//         return intervalId = setInterval( ()=>{
//             res.json({sections : lessonarray })
//             if (count === 1) {
//                 clearInterval(intervalId);
//               }
//         }, 1000); 

//     }
//     waitTIMER();

//    }).catch(err => {
//     console.log(err)
// })
// }

exports.singlecoursepage = async (req, res) => {
    const id = req.params.courseid;
    const Lessons = course.lesson;
    try {
        const sections = await course.sections.findAll({
            where: {
                courseId: id
            },
            include: [Lessons]
        });
        //   console.log(sections)
        //   const result = sections.map((section) => {
        //     const { id, section_name, section_lesson } = section;
        //     const lessons = section_lesson.map((lesson) => {
        //       const { id, lesson_name, lesson_description } = lesson;
        //       return { id, lesson_name, lesson_description };
        //     });
        //     return { id, section_name, lessons };
        //   });
        //   console.log(result)
        // let showLessons = false
        res.status(200).json({ sections });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.postADDCart = async (req, res, next) => {
    const courseID = req.params.courseID;
    let num_courses
    const customer = await user.customer.findOne({
        where: {
            userId: req.userId
        }
    })
    // .then(customer => {
    cart.crt.findOne({
        where: {
            customerId: customer.id,
            purchased: false
        }
    }).then(cartINFO => {
        if (!cartINFO) {
            cart.crt.create({
                num_courses: 1,
                customerId: customer.id,
                purchased: false
            }).then(newcart => {
                cart.course_cart.create({
                    courseId: courseID,
                    cartId: newcart.id
                }).then(cart_course_ => {
                    console.log("first cart created for new customer")
                    res.json({ massage: "created new cart for new user" })
                }).catch(err => { console.log(err); });
            }).catch(err => {
                console.log("error in create cart", err);
            })
        } else if (cartINFO) {
            num_courses = cartINFO.num_courses + 1;
            cart.course_cart.findOne({
                where: {
                    courseId: courseID,
                    cartId: cartINFO.id
                }
            }).then(checkforCoursesincart => {
                if (!checkforCoursesincart) {
                    cart.crt.update({
                        num_courses: num_courses
                    }, {
                        where: {
                            customerId: customer.id,
                            purchased: false
                        }
                    }
                    ).then(CRT => {
                        // cart.course_cart.findOne({
                        //     where: {
                        //         courseId: courseID
                        //     }
                        // }).then(CRT_COURSE => {
                        // if (!CRT_COURSE) {
                        cart.course_cart.create({
                            courseId: courseID,
                            cartId: cartINFO.id
                        }).then(data => {
                            console.log("new course added to cart_course")
                            res.json({ massage: "we done here" })
                        }).catch(error => console.log(error));
                        // }
                        // console.log("course in cart_course")
                        // }).catch(err => console.log("err"))
                        // console.log("num_courses updated")
                    }).catch(err => { console.log(err); });
                } else if (checkforCoursesincart) {
                    res.json({ massage: "course already in cart" })
                }

            }).catch(err => {
                console.log("error in checkforCoursesincart", err);
            });
        }


    }).catch(err => {
        console.log("error in cart")
    })
    // }).catch(err => {
    //     console.log(err);
    // })
}

exports.DELETEcoursefromcart = (req, res) => {
    const cartId = req.query.cartId
    const courseId = req.query.courseId
    cart.course_cart.destroy({
        where: {
            courseId: courseId,
            cartId: cartId
        }
    }).then(deletedResult => {
        console.log('successfull')
        res.json({ massage: "deleted successfully" })
    }).catch(err => console.log("error in delete course form cart", err))
}






exports.postpayment = async (req, res) => {
    const cartid = req.params.cartid;
    // const customerid=req.userId;
    const customer = await user.customer.findOne({
        where: {
            userId: req.userId
        }
    })
    {
        var x = await (cart.course_cart.findAll({
            where: {
                cartid: cartid,
            }
        }))
            .then(cartresult => {
                var totalprice = 0.0
                for (let i = 0; i < cartresult.length; i++) {
                    course.course.findOne({
                        where: {
                            id: cartresult[i].courseId
                        }
                    })
                        .then(courseresult => {
                            course.cust_course.create({
                                courseId: courseresult.id,
                                customerId: customer.id
                            })

                            user.instructor.update({
                                Num_of_Student_enrolled: sequelize.literal('Num_of_Student_enrolled + 1')
                            }, {
                                where: {
                                    id: courseresult.instructorId
                                }
                            })
                            user.customer.update({
                                Total_Courses: sequelize.literal('Total_Courses + 1')
                            }, {
                                where: {
                                    id: customer.id
                                }
                            }
                            )
                            course.course.update({
                                num_student_enrolled: sequelize.literal('num_student_enrolled + 1')
                            }, {
                                where: {
                                    id: courseresult.id
                                }
                            }
                            )

                            totalprice = totalprice + courseresult.course_price
                            console.log(totalprice)
                            if (cartresult.length - i === 1) {
                                console.log("teeeeeeeeee")
                                payment.payment.create({
                                    payment_amount: totalprice,
                                    cartid: cartid,
                                    customerid: customer.id
                                }).then(paymentresult => {
                                    cart.crt.update({
                                        purchased: true,
                                    }, {
                                        where: {
                                            id: cartid
                                        }
                                    })

                                        .catch(err => {
                                            console.log("crt error update", err)
                                        })
                                }).catch(err => {
                                    console.log("error in payment", err)

                                })
                            }
                        }).catch(err => {
                            console.log(err, "error in total price")
                        })
                }

                // then(priceresult => {

                // }).catch(err => {
                //     console.log("error in price", err)
                // })

            }).then(result => {
                res.json({ massage: "successfull" })
            }).catch(err => {
                console.log("error in cartresult")
            })
    }
}
exports.DELETEcoursefromcart = (req, res) => {
    //  const cartId = req.query.cartId
    const courseId = req.params.courseId
    console.log(req.userId)
    user.customer.findOne({
        where: {
            userId: req.userId
        }
    }).then(CUSinfo => {
        cart.crt.findOne({
            where: {
                customerId: CUSinfo.id,
                purchased: false
            }
        }).then(CARTinfo => {
            let num_courses = CARTinfo.num_courses - 1;
            cart.crt.update({
                num_courses: num_courses
            }, {
                where: {
                    customerId: CUSinfo.id,
                    purchased: false
                }
            }).then(updatedresult => {
                cart.course_cart.destroy({
                    where: {
                        courseId: courseId,
                        cartId: CARTinfo.id
                    }
                }).then(deletedResult => {
                    console.log('successfull')
                    res.json({ massage: "deleted successfully" })
                }).catch(err => console.log("error in delete course_cart", err))
            }).catch(err => {
                console.log("error in update operation", err);
            })
        }).catch(err => { console.log(err) })

    }).catch(err => {
        console.log("error in delete from cart", err)
    })

    //  const usercart = await cart.crt.findOne({
    //     where : {
    //         customerId : customer.id
    //     }
    //  })

    //  let num_courses = usercart.num_courses -1 ;

    //  const DELETEonefromcart = await cart.crt.update({
    //     num_courses : num_courses
    //  },{
    //     where : {
    //         customer_id : customer.id
    //     }
    //  })
    //  cart.course_cart.destroy({
    //     where : {
    //         courseId : courseId ,
    //         cartId : cartId
    //     }
    //  }).then(deletedResult=>{
    //     console.log('successfull')
    //     res.json({massage : "deleted successfully"})
    //  }).catch(err => console.log("error in delete course form cart" ,err))
}

exports.getCart = (req, res, next) => {

    user.customer.findOne({
        userId: req.userId
    }).then(CUSinfo => {
        cart.crt.findOne({
            where: {
                customerId: CUSinfo.id,
                purchased: false
            }
        }).then(crt => {
            cart.course_cart.findAll({
                where: {
                    cartId: crt.id
                }
            }).then(async (courses) => {
                let arrayOfcourses = []
                let total_price = 0
                {
                    for (let i = 0; i < courses.length; i++) {
                        var x = (await (course.course.findOne({
                            where: {
                                id: courses[i].courseId
                            }
                        })))
                        arrayOfcourses = [...arrayOfcourses, x]
                        total_price = total_price + x.course_price
                    }
                    console.log(arrayOfcourses);
                    console.log(total_price);
                    let cartId = crt.id
                    res.json({ arrayOfcourses, total_price, cartId })

                }
            }).catch(error => {
                console.log("error in association table ", error);
            })
        }).catch(err => {
            console.log("error in")
        })
    }).catch(err => {
        console.log("error in getting cart")
    })

}

exports.addTowishlist = async (req, res) => {
    const courseId = req.params.courseId;
    let num_courses = 0
    const customer = await user.customer.findOne({
        where: {
            userId: req.userId
        }
    })

    cart.wishlist.findOne({
        where: {
            customerId: customer.id
        }
    }).then(wishlist => {
        if (!wishlist) {
            cart.wishlist.create({
                total_courses: 1,
                customerId: customer.id
            }).then(newWishlist => {
                cart.course_wishlist.create({
                    courseId: courseId,
                    WishlistId: newWishlist.id
                }).then(course_wishlist => {
                    res.json({ massage: "new wishlist created successfully" })
                }).catch(error => {
                    console.log("error in creating course_wishlist", error)
                })
                // console.log("wishlist created successfully")

            }).catch((error) => {
                console.log(error, "Error creating wishlist")
            })
        } else if (wishlist) {
            num_courses = wishlist.total_courses + 1

            cart.course_wishlist.findOne({
                where: {
                    courseId: courseId,
                    WishlistId: wishlist.id
                }
            }).then(wishlistCheck => {
                if (!wishlistCheck) {
                    cart.wishlist.update({
                        total_courses: num_courses
                    }, {
                        where: {
                            customerId: customer.id
                        }
                    }).then((updatedWishlist) => {
                        cart.course_wishlist.create({
                            courseId: courseId,
                            WishlistId: wishlist.id
                        }).then(newAssociation => {
                            res.json({ massage: "update wishlist successfull" })
                        }).catch(err => {
                            console.log("error in making new association record ", err);
                        })

                    }).catch((error) => {
                        console.log("Error updating wishlist", error)
                    })

                } else if (wishlistCheck) {
                    res.json({ massage: "course in wishlist already" })
                }
            })
        }

    })

}

exports.GetWishlist = async (req, res) => {

    const customer = await (user.customer.findOne({
        where: {
            userId: req.userId
        }
    }))

    cart.wishlist.findOne({
        where: {
            customerId: customer.id
        }
    }).then(userWishlist => {
        if (!userWishlist) {
            res.json({ massage: "no wishlist found" })
        }
        cart.course_wishlist.findAll({
            where: {
                WishlistId: userWishlist.id
            }
        }).then(userWishlistWithcourse => {
            res.json({ userWishlistWithcourse })
        }).catch(err => {
            console.log("error in association table", err)
        })
    })
}

exports.getmylearning = async (req, res) => {
    const customer = await user.customer.findOne({
        where: {
            userId: req.userId
        }
    })
    course.cust_course.findAll({
        where: {
            customerId: customer.id
        }
    }).then(async (custOcourseresult) => {
        for (let i = 0; i < custOcourseresult.length; i++) {
            const courses = await course.course.findOne({
                where: {
                    id: custOcourseresult[i].courseId
                }
            })

            if (custOcourseresult - i === 1) {
                res.json({ courses })
            }
        }
    }).catch(err => {
        console.log(err, "error in custOcourseresult")
    })
}
exports.deletewishlist = async (req, res) => {
    const courseId = req.params.courseId;
    const customer = await (user.customer.findOne({
        where: {
            userId: req.userId
        }
    }))
    const wishlist = await (
        cart.wishlist.findOne({
            where: {
                customerId: customer.id
            }
        }))
    cart.course_wishlist.destroy({
        where: {
            WishlistId: wishlist.id,
            courseId: courseId
        }
    }).then(result => {
        cart.wishlist.update(
            {
                total_courses: total_courses - 1
            }, {
            where: {
                customerId: customer.id
            }
        }).then(wishlistupdate => {
            res.json({ wishlistupdate })
        }).catch(err => {
            console.log(err, "error in ourse_wishlist.destroy")
        })
    }).catch(err => {
        console.log(err, "error in ourse_wishlist.destroy")
    })
}
