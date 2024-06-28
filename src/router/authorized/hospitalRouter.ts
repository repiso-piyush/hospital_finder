
import express from "express";
const hospitalRouter = express.Router();

import HospitalController from "../../controllers/hospitalController";

hospitalRouter.post('/create-hospital', HospitalController.createHospital);
hospitalRouter.post('/create-hospital-in-bulk', HospitalController.createHospitalsInBulk);
hospitalRouter.get('/get-hospitals', HospitalController.getHospitals);
hospitalRouter.get('/get-hospital/:id', HospitalController.getHospitalById);
hospitalRouter.put('/update-hospital/:id', HospitalController.updateHospital);
hospitalRouter.delete('/delete-hospital/:id', HospitalController.deleteHospital);
hospitalRouter.get('/get-hospitals-within-radius', HospitalController.findHospitalsWithinRadius);


export default hospitalRouter;