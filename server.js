const express=require('express');
const bodyparser=require('body-parser');
const db=require('mongoose');
const app=express();
app.use(bodyparser.json());
db.connect('mongodb://localhost:27017/test_db',{
    family:4,
});
db.connection.on('error',console.error.bind(console,"error throw while connecting db"));
db.connection.once('open',()=>{
    console.log("DB connected");
});
const student=db.model('student',new db.Schema({
    name:String,
    age:Number,
    gender:String,
    section:String,
}));
//post method
app.post('/students/addStudent',async(req,res)=>{
    await new student(req.body).save();
    res.send("student db saved");
});
//get method
app.get('/students/getAllStudent',async(req,res)=>{
    const stu=await student.find({});
    res.json(stu);
    res.send(stu);
});
//PUT method
app.put('/students/updateStudent/:id', async (req, res) => {
    const { id } = req.params;
    await student.findByIdAndUpdate(id, req.body);
    res.send("Student updated successfully");
});

// Delete method
app.delete('/students/deleteStudent/:id', async (req, res) => {
    const { id } = req.params;
    await student.findByIdAndDelete(id);
    res.send("Student deleted successfully");
});

app.listen(3000);