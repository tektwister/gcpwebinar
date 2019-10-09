const Express = require("express")
const fileUpload = require('express-fileupload');
const app = Express()
const cors = require("cors")
const axios = require('axios')

app.use(fileUpload())
app.use(cors({ origin: ['http://localhost:3000'] }))

app.get("/test",(req,res) => {
    res.json({
      message:"Hello Aravind!"
    })
});

app.post('/upload', async (req, res) => {
  
  // console.log(req.files.file.data);
  const arrByte = Uint8Array.from(req.files.file.data)
  const bearerToken = 'ya29.Iq4Bmwea8UYe7lwJXDnePwmbRe7J2TjefMQHAiIcb_FRTI7BZBcxQ2GpxIbjRTkGxUjzGOqdRIPg7OQRdI5Mzi7qJHKDJNc148NrimcePta-AeC1ulP-q6GigLFCJ3kux1Zip8Lx4auCv4IOYazEGvIaFmRn_Rkc0CzJJPoC-olQIpDyrM4EzcJLNmSUIXBQKwCKMQLJaNWwxpimxKznCeldcok8KTHsbTVUvYgcMvb4' 
  const automl = require('@google-cloud/automl');
  const client = new automl.PredictionServiceClient();
  const projectId = `gcp-webinar-255116`;
  const computeRegion = `us-central1`;
  const modelId = `ICN4279952985096683751`;

  const modelFullId = client.modelPath(projectId, computeRegion, modelId);
  const payload = {};
  payload.image = {imageBytes: arrByte};
  const [response] = await client.predict({
    name: modelFullId,
    payload: payload,
  });

  console.log(`Prediction results:`);
  response.payload.forEach(result => {
    console.log(`Predicted class name: ${result.displayName}`);
    console.log(`Predicted class score: ${result.classification.score}`);
  });

  res.send("Hello")
})

app.listen(4000, (error) => {
    if (error) {
      console.log(`Cannot Start Server | Error : ${error}`)
    } else {
      console.log(`Server Started on PORT 4000`)
    }
});