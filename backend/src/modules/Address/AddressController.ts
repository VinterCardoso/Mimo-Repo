import { z } from 'zod'; // Import Zod
import { FastifyTypedInstance } from '../../types.js';
import { AddressRepository } from './AddressRepository.js';
import { AddressService } from './AddressService.js';

// Define Zod schemas for request parameters and body
const ListAddressByUserIdParamsSchema = z.object({
    id: z.string(),
});

const CreateAddressBodySchema = z.object({
    userId: z.number(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

const UpdateAddressParamsSchema = z.object({
    id: z.string(),
});

const UpdateAddressBodySchema = z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
});

const DeleteAddressParamsSchema = z.object({
    id: z.string(),
});

export async function addressController(fastify: FastifyTypedInstance) {
    const addressRepository: AddressRepository = new AddressRepository();
    const addressService: AddressService = new AddressService(addressRepository);

    fastify.get('/address', async (req, res) => {
        const address = await addressService.listAddress();
        res.status(200).send(address);
    });

    fastify.get(
        '/address/user/:id',
        {
            schema: {
                params: ListAddressByUserIdParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from ListAddressByUserIdParamsSchema
            const address = await addressService.listAddressByUserId(+id);
            res.status(200).send(address);
        }
    );

    fastify.post(
        '/address',
        {
            schema: {
                body: CreateAddressBodySchema,
            },
        },
        async (req, res) => {
            const address = await addressService.createAddress(req.body);
            res.status(201).send(address);
        }
    );

    fastify.patch(
        '/address/:id',
        {
            schema: {
                params: UpdateAddressParamsSchema,
                body: UpdateAddressBodySchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from UpdateAddressParamsSchema
            const body = req.body; // Type is inferred from UpdateAddressBodySchema
            const address = await addressService.updateAddress(+id, body);
            res.status(200).send(address);
        }
    );

    fastify.delete(
        '/address/:id',
        {
            schema: {
                params: DeleteAddressParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from DeleteAddressParamsSchema
            await addressService.deleteAddress(+id);
            res.status(204).send();
        }
    );
}