const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp');
const path = require('path');
const uploadImg = async (req, res) => {

    try{
        // If there is no file selected send status false
        if(!req.files) {
            res.send({
                status: false,
                message: "No image was uploaded"
            })
        } else {
            // Save the img in sampleFile varible
            const sampleFile = req.files.sampleFile;
            // The path of the img folde where we are going to save the images
            const rutaDirServer = process.env.UPLOADS_IMG
            const img = await sharp(sampleFile.data)
                .resize(400, 300)
                .toFile(path.join(rutaDirServer, `${uuidv4()}.jpg`))
                console.log("./img/")
              
            // the path where we gona save our picture

            res.status(200).send({
                message: "Image uploaded successfully",
                data: {
                    name: img.name,
                    size: img.size
                }
            })
        }
    } catch (err) {
        res.status(500).send("[ERROR] No se ha podido cargar el archivo")
    }
}

module.exports = {
    uploadImg
}