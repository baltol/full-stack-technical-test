import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const columns = [
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Assigned To',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Answering Mode',
        dataIndex: 'answering_mode',
        key: 'answering_mode',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    }
];

const phrase = (first, last) => {
    if (first && last) {
        return `${first} ${last}`;
    }
    return '';
};

export const format = (doc, i) => {
    const name = phrase(doc.first_name, doc.last_name);
    const string = `+${doc.number.toString()}`;
    const { number, country } = parsePhoneNumberFromString(string);

    const {
        id,
        ...result
    } = {
        ...doc,
        key: i,
        number,
        country,
        name
    };
    return result;
};
