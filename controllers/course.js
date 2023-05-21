const course = require('../DataBase/coursesDetails');
const user = require('../DataBase/mainuserdata');
const cart = require('../DataBase/Analysis');
const mainproduct = require('../DataBase/mainproduct');



let instructor_image;
// let lessonarray =[];


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
    let num_lessons =0;
    for(let i = 0; i < sections.length; i++) {
        num_lessons=num_lessons+sections[i].lesson.length;
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
        course_name:course_name,
        course_price:course_price,
        course_description:course_description,
        course_language:course_language,
        course_rate: 0.0,
        num_student_enrolled:0,
        level:level,
        // topicId:topicdetails.id,
        Instructor_name:req.userNAME,
        num_sections:sections.length,
        num_lesson:num_lessons,
        course_active: 1,
        admin_active: 0,
        instructorId:insDeltails.id
    }).then(courseresult =>{
        for(let i=0; i<skilled_learn.length; i++) {
            course.skillgain.create({
                skill_gain_name:skilled_learn[i],
                courseId:courseresult.id
            })
        }
        for(let i=0; i<pre.length; i++) {
            course.prereq.create({
                pre_name:pre[i],
                courseId:courseresult.id
            })
        }
        for(let i=0; i<sections.length; i++) {
            course.sections.create({
                section_name:sections[i].sectionName,
                courseId:courseresult.id,
                section_lesson:sections[i].lesson.length,
                showLessons: 0
            }).then(sectionresult =>{
                for(let j=0; j<sections[i].lesson.length; j++) {
                    course.lesson.create({
                        lesson_name:sections[i].lesson[j].lessonName,
                        lesson_duration:sections[i].lesson[j].duration,
                        SectionId:sectionresult.id
                    })
                }
            }).catch(error => {
                console.log("error in sectionresult" ,error);
            })
           
        }
        function waitTIMER(){
                    let count =1 
                    return intervalId = setInterval( ()=>{
                        res.json({massage: "TOP JOB" })
                        if (count === 1) {
                            clearInterval(intervalId);
                          }
                    }, 1000); 
            
                }
                waitTIMER();

    }).catch(err =>{
        console.log("error in course creation",err)
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

exports.Getinstructorprofile = (req, res) => {

    const id = req.params.userId;

    user.user.findOne({
        where: {
            id: id
        }
    }).then(userINFO => {
        user.instructor.findOne({
            userId: userINFO.id
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
    }).catch(err => {
        console.log(err)
    })

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
        res.status(200).json({sections});
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.postADDCart = (req, res, next) => {
    const courseID = req.params.courseID;
    let num_courses
    user.customer.findOne({
        where: {
            userId: req.userId
        }
    }).then(customer => {
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
            }

            num_courses = cartINFO.num_courses + 1;
            cart.crt.update({
                num_courses: num_courses
            }, {
                where: {
                    customerId: customer.id,
                    purchased: false
                }
            }
            ).then(CRT => {
                cart.course_cart.findOne({
                    where: {
                        courseId: courseID
                    }
                }).then(CRT_COURSE => {
                    if (!CRT_COURSE) {
                        cart.course_cart.create({
                            courseId: courseID,
                            cartId: cartINFO.id
                        }).then(data => {
                            console.log("new course added to cart_course")
                            res.json({ massage: "we done here" })
                        }).catch(error => console.log(error));
                    }
                    console.log("course in cart_course")
                }).catch(err => console.log("err"))
                console.log("num_courses updated")
            }).catch(err => { console.log(err); });


        }).catch(err => {
            console.log("error in cart")
        })
    }).catch(err => {
        console.log(err);
    })
}
