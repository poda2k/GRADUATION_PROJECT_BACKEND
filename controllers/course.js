const course = require('../DataBase/coursesDetails');
const user = require('../DataBase/mainuserdata');

let instructor_image;
let lessonarray =[];


exports.POSTcourse = (req, res, next) => {
    const course_name  =  req.body.course_name ;
    const course_status = "will be deleted"
    const Instructor_name = req.userNAME ;
    const course_price = req.body.course_price ;
    const course_description = req.body.course_description ;
    const course_language = req.body.course_language ;
    const course_image = req.file.path.split('\\').join('/');
    const course_rate = 0.0 ;
    const total_hours = req.body.total_hours ;
    const num_sections = req.body.num_sections ;
    const num_lesson = req.body.num_lesson ;
    const course_active = 1 ;
    const admin_active = 0 ;
    const num_student_enrolled = 0;
    const section_name = req.body.section_name;
    const Total_Section_Lessons = req.body.Total_Section_Lessons;
    const Lesson_Name =req.body.Lesson_Name;
    const Lesson_Type =req.body.Lesson_Type;
    const Lesson_Description =req.body.Lesson_Description;
    console.log(course_image)
    const imageUrl = course_image.path;
    user.instructor.findOne({
        where:{
            userId : req.userId
        }
    }).then(result => {
        if(req.userType==='Individual Instructor'){
            course.course.create({
                course_name  : course_name,
                course_statues : course_status,
                Instructor_name : Instructor_name,
                course_price : course_price,
                course_description: course_description,
                course_language: course_language,
                course_image : course_image,
                course_rate : course_rate,
                total_hours : total_hours,
                num_sections : num_sections,
                num_lesson : num_lesson,
                course_active : course_active,
                admin_active : admin_active,
                num_student_enrolled: num_student_enrolled,
                instructorId : result.id
            }).then(result => {
                res.status(201).json({
                    massage:"course uploaded successfully"
                })
            }).catch(err => {
                console.log(err);
            })
        }else if(req.userType==='educational_partner'){
            course.course.create({
                course_name  : course_name,
                course_statues : course_statues,
                Instructor_name : Instructor_name,
                course_price : course_price,
                course_description: course_description,
                course_language: course_language,
                course_image : course_image,
                course_rate : course_rate,
                total_hours : total_hours,
                num_sections : num_sections,
                num_lesson : num_lesson,
                course_active : course_active,
                admin_active : admin_active,
                num_student_enrolled: num_student_enrolled,
                EducationalPartnerId : result.id
            }).then(result => {
                res.status(201).json({
                    massage:"course uploaded successfully"
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }).catch(err => {
        console.log(err) ;
    })


}

exports.GETcourse = (req, res) => {
    const id = req.params.courseId ;
    


    course.course.findOne({
        where :{
            id : id
        }
    }).then(coursecontent => {
        if(!coursecontent) {
            const err = new Error('no course found');
            throw err;
        }
        user.instructor.findOne({
            where : {
                id : coursecontent.instructorId 
            }
        }).then(result => {
           
            user.user.findOne({
                where:{
                    id:result.userId
                }
            }).then(result =>{
                instructor_image = result.Image_Profile;
                course.skillgain.findAll({
                    where : {
                        courseId : coursecontent.id
                    }
                }).then(result =>{
                    res.json({ courseHeader : [coursecontent , {image : instructor_image} , {overview : result}] })
                }).catch(err =>{
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
        res.json({courses: result})
    }).catch(err => {
        console.log(err)
    })
}
exports.Getinstructorconponent =(req, res) => {
    const id = req.params.instructorId;
    user.user.findOne({
        where : {
            id : id 
        }
    }).then(instructorINFO => {
      user.contacttype.findOne({
        where:{
            userId:instructorINFO.id
        }
      }).then(result =>{
        if(!result) {
            const err = new Error('no instructor found');
            throw err;
        }

        res.json({instructorDetails : [instructorINFO,result]})
      }).catch(err => {
        console.log(err);
      })
 
    })
    .catch(err => {
        console.log(err)
    })
}

exports.Getinstructorprofile = (req,res) => {

    const id = req.params.instructorId ;

    user.user.findOne({
        where:{
            id : id 
        }
    }).then(userINFO => {
        user.instructor.findOne({
            userId : userINFO.id
        }).then(instructorINFO => {
            course.course.findAll({
                instructorId : instructorINFO.id
            }).then(courseinfo => {
                if(!courseinfo) {
                    const err = new Error('no instructor found');
                    throw err;
                }
                res.json({instructorName : [userINFO ,instructorINFO,courseinfo]})
            }).catch(err => {console.log(err)})
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
    const id =req.params.courseid;
    const Lessons = course.lesson;
    try {
      const sections = await course.sections.findAll({
        where:{
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
      res.status(200).json(sections);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }