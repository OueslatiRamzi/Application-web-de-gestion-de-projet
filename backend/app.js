const express = require('express')//import express js

const bodyParser = require('body-parser')// import module body-parser
const mongoose = require('mongoose'); // import module mongoose
const bcrypt = require('bcrypt'); // import module bcrypt
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const multer = require('multer');

const secretKey = 'your-secret-key';


mongoose.connect('mongodb://127.0.0.1:27017/DomovitProjects_DB')
    .then(
        () => console.log('connected')
    )

const Project = require('./models/project')//import model project
const User = require('./models/user')  // import Model User
const Client = require('./models/client')  // import Model Client


const app = express() //creation d'app express

app.use('/images', express.static(path.join('backend/images')))

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

// const storage = multer.diskStorage({
//     // destination
//     destination: (req, file, cb) => {
//         const isValid = MIME_TYPE[file.mimetype];
//         let error = new Error("Mime type is invalid");
//         if (isValid) {
//             error = null;
//         }
//         cb(null, 'backend/images')
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.toLowerCase().split(' ').join('-');
//         const extension = MIME_TYPE[file.mimetype];
//         const imgName = name + '-' + Date.now() + '-DomovitProject-' + '.' +
//             extension;
//         cb(null, imgName);
//     }
// });

// Define storage for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending timestamp to make filenames unique
    }
});

const upload = multer({ storage: storage });

// Configurez multer pour gérer plusieurs fichiers
// const upload = multer({ storage: storage }).array('images', 10); // 'images' est le nom du champ de fichier dans le formulaire

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// session configuration
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

//parse application/json
app.use(bodyParser.json())

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
})


//here traitement logique signup
app.post('/users', async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 8);

        const data = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            role: req.body.role,
        });

        const savedUser = await data.save();
        console.log("savedUser", savedUser);

        res.status(200).json({
            message: "user added"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Email existe"
        });
    }
});

//here traitement logique login
app.post('/users/login', async (req, res) => {
    try {
        const findedUser = await User.findOne({ email: req.body.email });

        if (!findedUser) {
            // User not found
            return res.status(200).json({
                message: '0'
            });
        }

        const trusted = await bcrypt.compare(req.body.pwd, findedUser.password);

        if (!trusted) {
            // Incorrect password
            return res.status(200).json({
                message: '1'
            });
        }

        // Generate a token for the authenticated user
        const token = jwt.sign({ user: findedUser }, secretKey, { expiresIn: '1h' });

        console.log(token);

        res.status(200).json({
            user: token,
            message: '2'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


//here traitement logique add project
// Route pour ajouter un projet avec plusieurs images
app.post('/projects', upload.array('images'), (req, res) => {
    // Utilisez multer pour gérer les téléchargements de fichiers
    // Logique de traitement des fichiers ici
    let url = req.protocol + '://' + req.get('host');
    let images = req.files.map(file => url + '/images/' + file.filename);
    // Créez un nouveau projet avec les données du formulaire et les URLs des images
    const data = new Project({
        name: req.body.name,
        produits: req.body.produits,
        promotion: req.body.promotion,
        contactPromoteur: req.body.contactPromoteur,
        zone: req.body.zone,
        bureauDetude: req.body.bureauDetude,
        installateur: req.body.installateur,
        contactInstallateur: req.body.contactInstallateur,
        avancement: req.body.avancement,
        dateVisite: req.body.dateVisite,
        remarque: req.body.remarque,
        images: images,
    });

    // Enregistrez le projet dans la base de données
    data.save().then(() => {
        res.json({ message: "Projet ajouté avec succès" });
    }).catch(err => {
        res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement du projet." });
    });

});
//here traitement logique get all projects
app.get('/projects', (req, res) => {

    Project.find().populate('projectId').then((projects) => {
        // console.log("here into get all projects", docs);
        if (projects) {
            res.status(200).json({
                projects: projects
            })
        }


    })

})
//here traitement logique delete project
app.delete('/projects/:id', (req, res) => {
    Project.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "Project deleted"
        })
    })

})
//here traitement logique get project by id
app.get('/projects/:id', (req, res) => {
    Project.findOne({ _id: req.params.id }).then((findedObject) => {
        if (findedObject) {
            res.status(200).json({
                project: findedObject
            })
        }
    })
})
//here traitement logique update project by id
app.put("/projects", (req, res) => {
    console.log("req", req.body);
    Project.updateOne({ _id: req.body._id }, req.body).then(() => {
        res.status(200).json({
            message: "Project Updated"
        })
    })
})

// here Trait logi add Client
app.post('/clients', (req, res) => {
    const data = new Client({
        name: req.body.name,
        numFacture: req.body.numFacture,
        valeurFacture: req.body.valeurFacture,
        valeurReglement: req.body.valeurReglement,
        moyenReglement: req.body.moyenReglement,
        remarque: req.body.remarque,
    })
    data.save().then(() => {
        res.json({
            message: "client added"
        })
    })
})


// here Trait logi get all Cliens
app.get('/clients', (req, res) => {
    Client.find().then((docs) => {
        res.status(200).json({
            clients: docs
        })
    })

})

// here Trait logi delete client
app.delete('/clients/:id', (req, res) => {
    Client.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: "client deleted"
        })
    })

})

// here Trait logi get client by id
app.get('/clients/:id', (req, res) => {
    Client.findOne({ _id: req.params.id }).then((findedObject) => {
        if (findedObject) {
            res.status(200).json({
                client: findedObject
            })

        }
    })

})

// here Trait logi update client by id
app.put("/clients", (req, res) => {
    Client.updateOne({ _id: req.body._id }, req.body).then(() => {
        res.status(200).json({
            message: "client updated"
        })
    })
})


module.exports = app //make app exportable
