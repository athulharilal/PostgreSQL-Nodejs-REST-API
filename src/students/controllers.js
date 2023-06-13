const pool = require('../../db');
const queries = require('./queries')

const getStudents = (req,res)=>{
    pool.query(queries.getStudents,(error,results)=>{
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getStudentsByID =(req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsByID,[id],(error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}
const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    
    // Check if email exists
    pool.query(queries.checkEmailExists, [email], (error, result) => {
      if (error) {
        throw error; // Throw the error if there's an issue with the query
      }
  
      if (result.rows.length) {
        res.send("EMAIL ALREADY EXISTS");
      } else {
        // Add student to the database
        pool.query(queries.addStudent, [name, email, age, dob], (error, result) => {
          if (error) {
            // Handle the error gracefully by sending an error response
            res.status(500).send("An error occurred while adding the student.");
          } else {
            res.send("Student added successfully.");
          }
        });
      }
    });
  };

  const removeStudent = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsByID, [id] ,(error,result)=>{
        const noStudentFound = !result.rows.length;
        if (noStudentFound) {
            res.send("Student doesnot exist in the database ,could not remove ");
        }
        pool.query(queries.removeStudent,[id],(error,result)=>{
            if (error) {
                throw error
            }
            res.status(200).send(" Student Deleted Successfully.")
        })
    })
  }

const updateStudent =(req,res)=>{
    const id = parseInt(req.params.id);
    const { name } = req.body

    pool.query(queries.getStudentsByID , [id], (error,result)=>{
        const noStudentFound =!result.rows.length;
        if (noStudentFound) {
            res.send(" Student doesnot exist in the database")
        }
        console.log("api call");
        pool.query(queries.updateStudent , [name, id],(error,result) =>{
            if (error) {
                throw error
            }
            res.status(200).send("Student Updated Successfully")
        })
    })

}
module.exports={
    getStudents,
    getStudentsByID,
    addStudent,
    removeStudent,
    updateStudent
}