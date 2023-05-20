const  Sequelize = require('sequelize');
const connec = require('./DB_con');

 const course=connec.define('course',{
    course_name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    course_statues:{
        type: Sequelize.STRING
    }
    ,Instructor_name:{
        type:Sequelize.STRING,
        allowNull:true
    }

    ,course_price:{
        type:Sequelize.DOUBLE,
        allowNull:true
    }

    ,course_description:{
        type:Sequelize.STRING,
        allowNull:true
    },
    course_summary :{
        type : Sequelize.STRING, 
        allowNul : true
    }
    ,course_language:{
        type:Sequelize.STRING,
        allowNull:true
    }

    ,course_image:{
        type:Sequelize.STRING,
        allowNull:true
    }

    ,course_rate:{
        type:Sequelize.INTEGER,
        validate:{
            max:5
        }
    }

    ,total_hours:{
        type:Sequelize.DATE,
        allowNull:true
    }

    ,num_sections:{
        type:Sequelize.INTEGER,
        allowNull:true
    }

    ,num_lesson:{
        type:Sequelize.INTEGER,
        allowNull:true
    }

    ,course_active:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    },
    admin_active:{
        type: Sequelize.BOOLEAN
    }

    ,num_student_enrolled:{
        type:Sequelize.INTEGER
    },
    level : {
        type : Sequelize.STRING, 
        allowNul : false
    }
    });

    const cust_course=connec.define('Costomer Course',{
        complete:{
            type:Sequelize.BOOLEAN,
            allowNull:true
        }
    });

    const prereq=connec.define('prerequisite',{
        pre_name:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });

    const skillgain=connec.define('skills gain',{
        skill_gain_name:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });
    
    const sections=connec.define('Sections',{
        section_name:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,section_hour:{
            type:Sequelize.DOUBLE,
            allowNull:true
        }
        ,section_lesson:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        showLessons :{
            type:Sequelize.BOOLEAN ,
            allowNul : false
        }

    });

    const lesson=connec.define('lesson',{
        lesson_name:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,lesson_type:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,lesson_description:{
            type:Sequelize.STRING,
            allowNul:true
        },
        Video : {
            type:Sequelize.STRING ,
            allowNull:true
        }
    });

    const onsite=connec.define('onsite lesson',{
        start_time:{
            type:Sequelize.DATE,
            allowNul:true
        }
        , end_time:{
            type:Sequelize.DATE,
            allowNull:true
        }
    });

    const recorded=connec.define('recoreded lesson',{
        video:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,time_lesson:{
            type:Sequelize.DATE,
            allowNull:true
        }
    });

    const live=connec.define('live meeting',{
        zoom_meeting:{
            type:Sequelize.STRING,
            allowNull:true
        }
        , start_time_:{
            type:Sequelize.DATE,
            allowNull:true
        }
        ,duration:{
            type:Sequelize.INTEGER,
            allowNull:true
        }
    });

    const pack=connec.define('Packages',{
        num_courses:{
            type:Sequelize.INTEGER,
            allowNull:true
        }
        ,package_name:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,price:{
            type:Sequelize.DOUBLE,
            allowNull:true
        }
        ,description:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Admin_approvement_pack:{
            type: Sequelize.BOOLEAN
    
        }
    });
    const exam=connec.define('Exams',{
        exam_link:{
            type:Sequelize.STRING
        }
        ,exam_score:{
            type:Sequelize.INTEGER
        }
    });



    const off_pack=connec.define('Offer Package',{
        name:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,statues:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,price:{
            type:Sequelize.DOUBLE,
            allowNull:true
        }
        ,discount:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
    Admin_approvement_offpack:{
        type: Sequelize.BOOLEAN

    }

    });

    const off_cour=connec.define('Offer_Course',{
        name:{
            type:Sequelize.STRING,
            allowNull:true
        }
        ,description:{
            type:Sequelize.STRING
            ,allowNull:true
        }
        ,price:{
            type:Sequelize.DOUBLE,
            allowNull:true
        }
        ,discount_price:{
            type:Sequelize.DOUBLE,
            allowNull:true
        },
        Admin_approvement_offcourse:{
            type: Sequelize.BOOLEAN
    
        }
    });
    
    
    module.exports={
        course,
        skillgain,
        prereq,
        sections,
        lesson,
        onsite,
        recorded,
        live,
        pack,
        off_cour,
        exam,
        off_pack,
        cust_course 

    } ;
    

    