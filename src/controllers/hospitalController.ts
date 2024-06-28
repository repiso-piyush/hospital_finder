import { Request, Response } from 'express';
import  prisma  from '../index';


class HospitalController {
  async createHospitalsInBulk(req: Request, res: Response): Promise<void> {
    const hospitals = req.body; 
    try {
      const createdHospitals = await prisma.hospital.createMany({
        data:hospitals ,   
      });
      res.json(createdHospitals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  async createHospital(req: Request, res: Response): Promise<void> {

    const { name, address, lat, long } = req.body;
  
    try {
      const hospital = await prisma.hospital.create({
        data: {
          name,
          address,
          lat,
          long
        }
      });
      res.json(hospital);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getHospitals(req: Request, res: Response): Promise<void> {
    try {
      const hospitals = await prisma.hospital.findMany();
      res.send(hospitals); 
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getHospitalById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const hospital = await prisma.hospital.findUnique({
        where: { id: parseInt(id) }
      });
      res.json(hospital);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateHospital(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, address, lat, long} = req.body;
    try {
      const hospital = await prisma.hospital.update({
        where: { id: parseInt(id) },
        data: {
          name,
          address,
          lat,
          long
        }
      });
      res.json(hospital);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteHospital(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const hospital = await prisma.hospital.delete({
        where: { id: parseInt(id) }
      });
      res.json(hospital);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findHospitalsWithinRadius(req: Request, res: Response): Promise<void> {
    const { latitude, longitude, radius } = req.query;
    try {
      const hospitals = await prisma.$queryRaw`
        SELECT * FROM "Hospital"
        WHERE ST_DWithin(
          ST_SetSRID(ST_MakePoint("long", "lat"), 4326),
          ST_SetSRID(ST_MakePoint(${parseFloat(longitude as string)}, ${parseFloat(latitude as string)}), 4326),
          ${parseFloat(radius as string)}
        )
      `;
      res.json(hospitals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new HospitalController();
