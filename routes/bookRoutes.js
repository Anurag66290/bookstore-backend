const express = require('express');
const router = express.Router();
const Book = require('../model/book');
const User = require('../model/user');
const Order = require('../model/order');
const nodemailer = require('nodemailer');

// Create a new Book (Admin only)
router.post('/create', async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const newBook = await Book.create({ title, author, description });
        
        // Send email notification to Superadmin
        sendEmailToSuperadmin('New Book Created', `A new book titled "${title}" has been created.`);
        
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Book creation failed', error });
    }
});

// Update Book (Admin only)
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, description } = req.body;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        book.title = title;
        book.author = author;
        book.description = description;
        await book.save();

        // Send email notification to Superadmin
        sendEmailToSuperadmin('Book Updated', `The book titled "${title}" has been updated.`);
        
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Book update failed', error });
    }
});

const sendEmailToSuperadmin = async (subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anurag@gmail.com',
            pass: 'anu@123'
        }
    });

    let mailOptions = {
        from: 'anurag@gmail.com',
        to: 'superadminEmail@gmail.com',
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email sending failed:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = router;
