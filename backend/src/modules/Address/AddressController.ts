import { FastifyTypedInstance } from '../../types.js';
import { AddressRepository } from './AddressRepository.js';
import { AddressService } from './AddressService.js';

export async function addressController(fastify: FastifyTypedInstance) {
    const addressRepository: AddressRepository = new AddressRepository();
    const addressService: AddressService = new AddressService(addressRepository);
    
    fastify.get('/address', async (req, res) => {
        const address = await addressService.listAddress();
        res.status(200).send(address);
    });

    fastify.get('/address/user/:id', async (req, res) => {
        const address = await addressService.listAddressByUserId(+req.params.id);
        res.status(200).send(address);
    });

    fastify.post('/address', async (req, res) => {
        const address = await addressService.createAddress(req.body);
        res.status(201).send(address);
    });

    fastify.patch('/address/:id', async (req, res) => {
        const address = await addressService.updateAddress(+req.params.id, req.body);
        res.status(200).send(address);
    });

    fastify.delete('/address/:id', async (req, res) => {
        await addressService.deleteAddress(+req.params.id);
        res.status(204).send();
    });
}