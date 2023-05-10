const course = require('../DataBase/coursesDetails');
const user = require('../DataBase/mainuserdata');

exports.POSTcourse = (req, res, next) => {
    const course_name  =  req.body.course_name ;
    const course_status = "will be deleted"
    const Instructor_name = req.userNAME ;
    const course_price = req.body.course_price ;
    const course_description = req.body.course_description ;
    const course_language = req.body.course_language ;
    const course_image = "stopped" ;
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
    user.instructor.findOne({
        where:{
            userId : req.userId
        }
    }).then(result => {
        if(req.userType==='Individual Instructor'){
            course.course.create({
                course_name  : course_name,
                course_statues : course_status,
                Instructor_name : result.Name,
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
    }).then(result => {
        if(!result) {
            const err = new Error('no course found');
            throw err;
        }
        res.json({

        })
    }).catch(err => {
        console.log(err)
    })
}
