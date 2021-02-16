const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

// Read all contacts
function listContacts() {
  try {
    fs.readFile(contactsPath, "utf-8").then((data) =>
      console.table(JSON.parse(data))
    );
  } catch (error) {
    console.log(error.message);
  }
}

// Read contact by ID
function getContactById(contactId) {
  try {
    fs.readFile(contactsPath, "utf-8").then((data) =>
      console.table(JSON.parse(data).find((el) => el.id === contactId))
    );
  } catch (error) {
    console.log(error.message);
  }
}

// Delete contact by ID
function removeContact(contactId) {
  try {
    fs.readFile(contactsPath, "utf-8").then((data) => {
      const newData = JSON.parse(data).filter((el) => el.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newData));
      console.log("Contact was successfully deleted");
    });
  } catch (error) {
    console.log(error.message);
  }
}

// Add new contact
function addContact(name, email, phone) {
  try {
    fs.readFile(contactsPath, "utf-8").then((data) => {
      const list = JSON.parse(data);
      const maxID = list.reduce(
        (acc, el) => (el.id > acc ? (acc = el.id) : acc),
        0
      );
      list.push({ id: maxID + 1, name, email, phone });
      fs.writeFile(contactsPath, JSON.stringify(list));
      console.log("Contact was successfully added");
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
