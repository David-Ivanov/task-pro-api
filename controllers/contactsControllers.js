import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contactsModel.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

const paginationAndFavorites = async (contacts, query, id) => {
    let { limit, page, favorite } = query;
    page = Number(page) - 1;
    limit = Number(limit);

    if (!page) {
        page = 0;
    }

    if (!limit) {
        limit = 10;
    }

    const length = contacts.length;

    const countOfPages = Math.ceil(length / limit) - 1;

    if (page > countOfPages) {
        page = countOfPages;
    }

    const skip = page * limit;

    const filter = favorite ? { owner: id, favorite: true } : { owner: id };

    try {
        return await Contact.find(filter).limit(limit).skip(skip);
    } catch (err) {
        return [];
    }
}

export const getAllContacts = async (req, res) => {
    const contacts = await Contact.find({ owner: req.user._id });
    const result = await paginationAndFavorites(contacts, req.query, req.user._id);
    res.json(result);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Contact.findOne({ owner: req.user._id, _id: id });

        if (!result) {
            res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
            return
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Contact.findOneAndDelete({ owner: req.user._id, _id: id });
        if (!result) {
            res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
            return
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
    }
};

export const createContact = async (req, res) => {
    const contact = {
        ...req.body,
        favorite: false,
        owner: req.user._id,
    }

    const { error } = createContactSchema.validate(contact);

    if (error) {
        res.status(400).send(JSON.stringify({ message: HttpError(400).message }));
        return
    }

    const result = await Contact.create(contact);

    res.status(201).send(result)
};

export const updateContact = async (req, res) => {
    const { id } = req.params;

    const contact = { ...req.body }

    if (!contact.name && !contact.email && !contact.phone) {
        res.status(400).send(JSON.stringify({ message: HttpError(400, "Body must have at least one field").message }));
        return
    }

    const { error } = updateContactSchema.validate(contact);

    if (error) {
        res.status(400).send(JSON.stringify({ message: HttpError(400).message }));
        return
    }


    try {
        const result = await Contact.findOneAndUpdate({ owner: req.user._id, _id: id }, contact);

        if (!result) {
            res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
            return
        }

        res.status(200).json(await Contact.findOne({ owner: req.user._id, _id: id }));
    } catch (err) {
        res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
    }
};

export const updateStatusContact = async (req, res) => {
    const { id } = req.params;

    const body = req.body;


    try {
        const result = await Contact.findOneAndUpdate({ owner: req.user._id, _id: id }, body);

        if (!result) {
            res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
            return
        }

        res.status(200).json(await Contact.findOne({ owner: req.user._id, _id: id }));
    } catch (error) {
        res.status(404).send(JSON.stringify({ message: HttpError(404).message }));
    }
}