const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// MYSQL DATABASE CONNECTION
// ===============================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vishu7",
    database: "myProject"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL database connected successfully!");
});

// ===============================
// FRONTEND
// ===============================

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

// ===============================
// LOGIN
// ===============================

app.post("/login", (req, res) => {

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Email, password and role are required"
        });
    }

    const sql = `
        SELECT user_id, name, email, roll_no, role, department, year_id
        FROM users
        WHERE email = ?
        AND password = ?
        AND role = ?
    `;

    db.query(sql, [email, password, role], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email, password or role"
            });
        }

        res.json({
            success: true,
            message: "Login successful",
            user: results[0]
        });
    });
});

// ===============================
// USERS
// ===============================

// Get all users
app.get("/users", (req, res) => {

    const sql = `
        SELECT user_id, name, email, roll_no, role, department, year_id
        FROM users
        ORDER BY user_id
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// Get single user
app.get("/users/:user_id", (req, res) => {

    const sql = `
        SELECT user_id, name, email, roll_no, role, department, year_id
        FROM users
        WHERE user_id = ?
    `;

    db.query(sql, [req.params.user_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json(results[0]);
    });
});

// ===============================
// ACADEMIC YEARS
// ===============================

app.get("/years", (req, res) => {

    const sql = `
        SELECT *
        FROM academic_years
        ORDER BY year_id
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// SEMESTERS
// ===============================

app.get("/semesters/:year_id", (req, res) => {

    const sql = `
        SELECT *
        FROM semesters
        WHERE year_id = ?
        ORDER BY semester_number
    `;

    db.query(sql, [req.params.year_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// SUBJECTS
// ===============================

app.get("/subjects/:semester_id", (req, res) => {

    const sql = `
        SELECT *
        FROM subjects
        WHERE semester_id = ?
        ORDER BY subject_id
    `;

    db.query(sql, [req.params.semester_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// UNITS
// ===============================

app.get("/units/:subject_id", (req, res) => {

    const sql = `
        SELECT *
        FROM units
        WHERE subject_id = ?
        ORDER BY unit_number
    `;

    db.query(sql, [req.params.subject_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// TOPICS
// ===============================

app.get("/topics/:unit_id", (req, res) => {

    const sql = `
        SELECT *
        FROM topics
        WHERE unit_id = ?
        ORDER BY topic_number
    `;

    db.query(sql, [req.params.unit_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// SINGLE TOPIC
// ===============================

app.get("/topic/:topic_id", (req, res) => {

    const sql = `
        SELECT *
        FROM topics
        WHERE topic_id = ?
    `;

    db.query(sql, [req.params.topic_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Topic not found"
            });
        }

        res.json(results[0]);
    });
});

// ===============================
// MATERIALS - BY TOPIC
// ===============================

app.get("/materials/topic/:topic_id", (req, res) => {

    const sql = `
        SELECT
            m.material_id,
            m.topic_id,
            m.title,
            m.description,
            m.file_url,
            m.file_name,
            m.uploaded_by,
            m.uploaded_at,
            u.name AS uploaded_by_name
        FROM materials m
        LEFT JOIN users u
        ON m.uploaded_by = u.user_id
        WHERE m.topic_id = ?
        ORDER BY m.uploaded_at DESC
    `;

    db.query(sql, [req.params.topic_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// MATERIALS - BY UNIT
// ===============================

app.get("/materials/unit/:unit_id", (req, res) => {

    const sql = `
        SELECT
            m.material_id,
            m.topic_id,
            m.title,
            m.description,
            m.file_url,
            m.file_name,
            m.uploaded_by,
            m.uploaded_at
        FROM materials m
        INNER JOIN topics t
        ON m.topic_id = t.topic_id
        WHERE t.unit_id = ?
        ORDER BY m.uploaded_at DESC
    `;

    db.query(sql, [req.params.unit_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// ADD MATERIAL
// ===============================

app.post("/materials", (req, res) => {

    const {
        topic_id,
        title,
        description,
        file_url,
        file_name,
        uploaded_by
    } = req.body;

    if (!topic_id || !title) {
        return res.status(400).json({
            success: false,
            message: "Topic and title are required"
        });
    }

    const sql = `
        INSERT INTO materials
        (topic_id, title, description, file_url, file_name, uploaded_by)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            topic_id,
            title,
            description || null,
            file_url || null,
            file_name || null,
            uploaded_by || null
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Could not add material"
                });
            }

            res.json({
                success: true,
                message: "Material added successfully",
                material_id: result.insertId
            });
        }
    );
});

// ===============================
// PREVIOUS YEAR QUESTIONS
// ===============================

app.get("/pyqs/:subject_id", (req, res) => {

    const sql = `
        SELECT
            p.pyq_id,
            p.subject_id,
            p.topic_id,
            p.exam_year,
            p.title,
            p.file_url,
            p.file_name,
            p.uploaded_by,
            p.uploaded_at,
            u.name AS uploaded_by_name
        FROM previous_year_questions p
        LEFT JOIN users u
        ON p.uploaded_by = u.user_id
        WHERE p.subject_id = ?
        ORDER BY p.exam_year DESC
    `;

    db.query(sql, [req.params.subject_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// ADD PYQ
// ===============================

app.post("/pyqs", (req, res) => {

    const {
        subject_id,
        topic_id,
        exam_year,
        title,
        file_url,
        file_name,
        uploaded_by
    } = req.body;

    if (!subject_id || !exam_year) {
        return res.status(400).json({
            success: false,
            message: "Subject and exam year are required"
        });
    }

    const sql = `
        INSERT INTO previous_year_questions
        (
            subject_id,
            topic_id,
            exam_year,
            title,
            file_url,
            file_name,
            uploaded_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            subject_id,
            topic_id || null,
            exam_year,
            title || null,
            file_url || null,
            file_name || null,
            uploaded_by || null
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Could not add PYQ"
                });
            }

            res.json({
                success: true,
                message: "PYQ added successfully",
                pyq_id: result.insertId
            });
        }
    );
});

// ===============================
// ASSIGNMENTS
// ===============================

// Get all assignments
app.get("/assignments", (req, res) => {

    const sql = `
        SELECT
            a.assignment_id,
            a.title,
            a.description,
            a.subject_id,
            s.subject_name,
            a.unit_id,
            un.unit_name,
            a.topic_id,
            t.topic_name,
            a.teacher_id,
            u.name AS teacher_name,
            a.due_date,
            a.created_at
        FROM assignments a

        LEFT JOIN subjects s
        ON a.subject_id = s.subject_id

        LEFT JOIN units un
        ON a.unit_id = un.unit_id

        LEFT JOIN topics t
        ON a.topic_id = t.topic_id

        LEFT JOIN users u
        ON a.teacher_id = u.user_id

        ORDER BY a.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// ASSIGNMENT DETAILS
// ===============================

app.get("/assignments/details", (req, res) => {

    const sql = `
        SELECT
            a.assignment_id,
            a.title,
            a.description,
            a.subject_id,
            s.subject_name,
            a.unit_id,
            un.unit_name,
            a.topic_id,
            t.topic_name,
            a.teacher_id,
            u.name AS teacher_name,
            a.due_date,
            a.created_at
        FROM assignments a

        LEFT JOIN subjects s
        ON a.subject_id = s.subject_id

        LEFT JOIN units un
        ON a.unit_id = un.unit_id

        LEFT JOIN topics t
        ON a.topic_id = t.topic_id

        LEFT JOIN users u
        ON a.teacher_id = u.user_id

        ORDER BY a.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// ASSIGNMENTS - BY TOPIC
// ===============================

app.get("/assignments/topic/:topic_id", (req, res) => {

    const sql = `
        SELECT
            a.assignment_id,
            a.title,
            a.description,
            a.subject_id,
            a.unit_id,
            a.topic_id,
            a.teacher_id,
            a.due_date,
            a.created_at,
            u.name AS teacher_name
        FROM assignments a

        LEFT JOIN users u
        ON a.teacher_id = u.user_id

        WHERE a.topic_id = ?

        ORDER BY a.created_at DESC
    `;

    db.query(sql, [req.params.topic_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// CREATE ASSIGNMENT
// ===============================

app.post("/assignments", (req, res) => {

    const {
        title,
        description,
        subject_id,
        unit_id,
        topic_id,
        teacher_id,
        due_date
    } = req.body;

    if (!title || !subject_id || !teacher_id || !due_date) {
        return res.status(400).json({
            success: false,
            message: "Title, subject, teacher and due date are required"
        });
    }

    const sql = `
        INSERT INTO assignments
        (
            title,
            description,
            subject_id,
            unit_id,
            topic_id,
            teacher_id,
            due_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            description || null,
            subject_id,
            unit_id || null,
            topic_id || null,
            teacher_id,
            due_date
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Could not create assignment"
                });
            }

            res.json({
                success: true,
                message: "Assignment created successfully",
                assignment_id: result.insertId
            });
        }
    );
});

// ===============================
// SUBMISSIONS - BY ASSIGNMENT
// ===============================

app.get("/submissions/:assignment_id", (req, res) => {

    const sql = `
        SELECT
            s.submission_id,
            s.assignment_id,
            s.student_id,
            u.name AS student_name,
            u.roll_no,
            s.file_url,
            s.file_name,
            s.status,
            s.submitted_at
        FROM assignment_submissions s

        INNER JOIN users u
        ON s.student_id = u.user_id

        WHERE s.assignment_id = ?

        ORDER BY s.submitted_at DESC
    `;

    db.query(sql, [req.params.assignment_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// STUDENT SUBMISSIONS
// ===============================

app.get("/student-submissions/:student_id", (req, res) => {

    const sql = `
        SELECT
            s.submission_id,
            s.assignment_id,
            a.title AS assignment_title,
            a.description,
            a.due_date,
            a.subject_id,
            sub.subject_name,
            a.unit_id,
            un.unit_name,
            a.topic_id,
            t.topic_name,
            s.file_url,
            s.file_name,
            s.status,
            s.submitted_at
        FROM assignment_submissions s

        INNER JOIN assignments a
        ON s.assignment_id = a.assignment_id

        LEFT JOIN subjects sub
        ON a.subject_id = sub.subject_id

        LEFT JOIN units un
        ON a.unit_id = un.unit_id

        LEFT JOIN topics t
        ON a.topic_id = t.topic_id

        WHERE s.student_id = ?

        ORDER BY s.submitted_at DESC
    `;

    db.query(sql, [req.params.student_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// SUBMIT ASSIGNMENT
// ===============================

app.post("/submissions", (req, res) => {

    const {
        assignment_id,
        student_id,
        file_url,
        file_name
    } = req.body;

    if (!assignment_id || !student_id) {
        return res.status(400).json({
            success: false,
            message: "Assignment and student are required"
        });
    }

    // Check duplicate submission
    const checkSql = `
        SELECT submission_id
        FROM assignment_submissions
        WHERE assignment_id = ?
        AND student_id = ?
    `;

    db.query(
        checkSql,
        [assignment_id, student_id],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "You have already submitted this assignment"
                });
            }

            const insertSql = `
                INSERT INTO assignment_submissions
                (
                    assignment_id,
                    student_id,
                    file_url,
                    file_name,
                    status
                )
                VALUES (?, ?, ?, ?, 'Submitted')
            `;

            db.query(
                insertSql,
                [
                    assignment_id,
                    student_id,
                    file_url || null,
                    file_name || null
                ],
                (err, result) => {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            success: false,
                            message: "Could not submit assignment"
                        });
                    }

                    res.json({
                        success: true,
                        message: "Assignment submitted successfully",
                        submission_id: result.insertId
                    });
                }
            );
        }
    );
});

// ===============================
// UPDATE SUBMISSION STATUS
// ===============================

app.put("/submissions/:submission_id/status", (req, res) => {

    const { status } = req.body;

    const allowedStatus = [
        "Pending",
        "Submitted",
        "Checked"
    ];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status"
        });
    }

    const sql = `
        UPDATE assignment_submissions
        SET status = ?
        WHERE submission_id = ?
    `;

    db.query(
        sql,
        [status, req.params.submission_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not update status"
                });
            }

            res.json({
                success: true,
                message: "Submission status updated successfully"
            });
        }
    );
});

// ===============================
// FEEDBACK - BY SUBMISSION
// ===============================

app.get("/feedback/submission/:submission_id", (req, res) => {

    const sql = `
        SELECT
            f.feedback_id,
            f.submission_id,
            f.teacher_id,
            u.name AS teacher_name,
            f.marks,
            f.feedback_text,
            f.reviewed_at
        FROM feedback f

        LEFT JOIN users u
        ON f.teacher_id = u.user_id

        WHERE f.submission_id = ?

        ORDER BY f.reviewed_at DESC
    `;

    db.query(sql, [req.params.submission_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// ADD FEEDBACK
// ===============================

app.post("/feedback", (req, res) => {

    const {
        submission_id,
        teacher_id,
        marks,
        feedback_text
    } = req.body;

    if (!submission_id || !teacher_id) {
        return res.status(400).json({
            success: false,
            message: "Submission and teacher are required"
        });
    }

    const sql = `
        INSERT INTO feedback
        (
            submission_id,
            teacher_id,
            marks,
            feedback_text
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            submission_id,
            teacher_id,
            marks || null,
            feedback_text || null
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Could not add feedback"
                });
            }

            // Automatically mark submission as Checked
            const updateSql = `
                UPDATE assignment_submissions
                SET status = 'Checked'
                WHERE submission_id = ?
            `;

            db.query(
                updateSql,
                [submission_id],
                (updateErr) => {

                    if (updateErr) {
                        console.error(updateErr);
                    }

                    res.json({
                        success: true,
                        message: "Feedback added and submission checked",
                        feedback_id: result.insertId
                    });
                }
            );
        }
    );
});

// ===============================
// DOUBTS
// ===============================

// Get all doubts
app.get("/doubts", (req, res) => {

    const sql = `
        SELECT
            d.doubt_id,
            d.student_id,
            student.name AS student_name,
            student.roll_no,
            d.subject_id,
            s.subject_name,
            d.topic_id,
            t.topic_name,
            d.title,
            d.question,
            d.answer,
            d.teacher_id,
            teacher.name AS teacher_name,
            d.status,
            d.created_at,
            d.answered_at

        FROM doubts d

        LEFT JOIN users student
        ON d.student_id = student.user_id

        LEFT JOIN subjects s
        ON d.subject_id = s.subject_id

        LEFT JOIN topics t
        ON d.topic_id = t.topic_id

        LEFT JOIN users teacher
        ON d.teacher_id = teacher.user_id

        ORDER BY d.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// STUDENT DOUBTS
// ===============================

app.get("/doubts/student/:student_id", (req, res) => {

    const sql = `
        SELECT
            d.doubt_id,
            d.student_id,
            d.subject_id,
            s.subject_name,
            d.topic_id,
            t.topic_name,
            d.title,
            d.question,
            d.answer,
            d.teacher_id,
            teacher.name AS teacher_name,
            d.status,
            d.created_at,
            d.answered_at

        FROM doubts d

        LEFT JOIN subjects s
        ON d.subject_id = s.subject_id

        LEFT JOIN topics t
        ON d.topic_id = t.topic_id

        LEFT JOIN users teacher
        ON d.teacher_id = teacher.user_id

        WHERE d.student_id = ?

        ORDER BY d.created_at DESC
    `;

    db.query(sql, [req.params.student_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// ===============================
// CREATE DOUBT
// ===============================

app.post("/doubts", (req, res) => {

    const {
        student_id,
        subject_id,
        topic_id,
        title,
        question
    } = req.body;

    if (!student_id || !title || !question) {
        return res.status(400).json({
            success: false,
            message: "Student, title and question are required"
        });
    }

    const sql = `
        INSERT INTO doubts
        (
            student_id,
            subject_id,
            topic_id,
            title,
            question,
            status
        )
        VALUES (?, ?, ?, ?, ?, 'Waiting for Answer')
    `;

    db.query(
        sql,
        [
            student_id,
            subject_id || null,
            topic_id || null,
            title,
            question
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Could not submit doubt"
                });
            }

            res.json({
                success: true,
                message: "Doubt submitted successfully",
                doubt_id: result.insertId
            });
        }
    );
});

// ===============================
// ANSWER DOUBT
// ===============================

app.put("/doubts/:doubt_id/answer", (req, res) => {

    const {
        answer,
        teacher_id
    } = req.body;

    if (!answer || !teacher_id) {
        return res.status(400).json({
            success: false,
            message: "Answer and teacher are required"
        });
    }

    const sql = `
        UPDATE doubts
        SET
            answer = ?,
            teacher_id = ?,
            status = 'Answered',
            answered_at = CURRENT_TIMESTAMP
        WHERE doubt_id = ?
    `;

    db.query(
        sql,
        [
            answer,
            teacher_id,
            req.params.doubt_id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not answer doubt"
                });
            }

            res.json({
                success: true,
                message: "Doubt answered successfully"
            });
        }
    );
});

// ===============================
// NOTIFICATIONS
// ===============================

// Get notifications for user
app.get("/notifications/:user_id", (req, res) => {

    const sql = `
        SELECT *
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(
        sql,
        [req.params.user_id],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            res.json(results);
        }
    );
});

// ===============================
// CREATE NOTIFICATION
// ===============================

app.post("/notifications", (req, res) => {

    const {
        user_id,
        title,
        message,
        notification_type
    } = req.body;

    if (!user_id || !title || !message) {
        return res.status(400).json({
            success: false,
            message: "User, title and message are required"
        });
    }

    const sql = `
        INSERT INTO notifications
        (
            user_id,
            title,
            message,
            notification_type
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            title,
            message,
            notification_type || null
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not create notification"
                });
            }

            res.json({
                success: true,
                message: "Notification created successfully",
                notification_id: result.insertId
            });
        }
    );
});

// ===============================
// MARK NOTIFICATION AS READ
// ===============================

app.put("/notifications/:notification_id/read", (req, res) => {

    const sql = `
        UPDATE notifications
        SET is_read = TRUE
        WHERE notification_id = ?
    `;

    db.query(
        sql,
        [req.params.notification_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not update notification"
                });
            }

            res.json({
                success: true,
                message: "Notification marked as read"
            });
        }
    );
});

// ===============================
// SERVER START
// ===============================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});