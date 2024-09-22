
const express = require('express');
const router = express.Router();
const mime = require('mime-types');


function isValidBase64(str) {
    try {
        return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
        return false;
    }
}

function getHighestLowercaseAlphabet(alphabets) {
    const lowercaseAlphabets = alphabets.filter(char => /^[a-z]$/.test(char));
    if (lowercaseAlphabets.length === 0) return [];
   
    lowercaseAlphabets.sort();
    return [lowercaseAlphabets[lowercaseAlphabets.length - 1]];
}


router.post('/', (req, res) => {
    try {
        const { data, file_b64 } = req.body;

       
        const user_id = "john_doe_17091999";
        const email = "john@xyz.com";
        const roll_number = "ABCD123";

      
        let numbers = [];
        let alphabets = [];
        let highest_lowercase_alphabet = [];

        if (Array.isArray(data)) {
            data.forEach(item => {
                if (/^\d+$/.test(item)) {
                    numbers.push(item);
                } else if (/^[A-Za-z]$/.test(item)) {
                    alphabets.push(item);
                }
            });
            highest_lowercase_alphabet = getHighestLowercaseAlphabet(alphabets);
        }


        let file_valid = false;
        let file_mime_type = null;
        let file_size_kb = null;

        if (file_b64 && isValidBase64(file_b64)) {
            file_valid = true;
         
            const buffer = Buffer.from(file_b64, 'base64');
            
            const mimeType = mime.lookup(buffer);
            file_mime_type = mimeType || 'unknown';
           
            file_size_kb = (buffer.length / 1024).toFixed(2);
        }

        // Construct Response
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highest_lowercase_alphabet,
            file_valid: file_valid,
            file_mime_type: file_mime_type,
            file_size_kb: file_size_kb
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({ is_success: false, message: 'Bad Request' });
    }
});


router.get('/', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

module.exports = router;
