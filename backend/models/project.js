const mongoose = require('mongoose'); // import mongoose

const projectSchema = mongoose.Schema({
    projectId : String,
    name: String,
    produits: String,
    promotion: String,
    contactPromoteur: String,
    zone: String,
    bureauDetude: String,
    installateur: String,
    contactInstallateur: String,
    avancement: String,
    dateVisite: String,
    remarque: String,
    images: [String],

})
const project = mongoose.model('Project', projectSchema)

module.exports = project;