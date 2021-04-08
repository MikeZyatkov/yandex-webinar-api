import Message from "../components/Message.js";
import Section from "../components/Section.js";
import Form from "../components/Form.js";
import Api from "../components/Api.js";

const messageSelector = '.message-template';
const messagesWrap = '.messages__list';
const messagesForm = '.messages-form';

const api = new Api({
    address: 'https://j1dg73na92.execute-api.eu-central-1.amazonaws.com/api',
    token: 'test'
});


const createMessage = (data) => {
    const message = new Message({
        data,
        handleDeleteButtonClick: () => {
            api.removeMessage(message.getId())
                .then(() => message.removeMessage())
                .catch(err => console.log('Ошибка при удалении'))
        }
    }, messageSelector);
    return message.getView()
};

const messagesList = new Section({
        renderer: (data) => {
            messagesList.addItem(createMessage(data));
        }
    }, messagesWrap
);

const form = new Form({
    addItem: (data) => {
        api.addMessage(data)
            .then(result => {
                messagesList.addItem(createMessage({...data, _id: result.id}))
            })
            .catch(err => console.log('Ошибка при создании сообщения'));
    }
}, messagesForm);

form.render();

api.getMessages()
    .then(messages => {
        console.log(messages);
        messagesList.renderItems(messages)
    })
    .catch(err => console.log(err));

const fakeData = [{user: 'test', message: 'test message'}, {user: 'test2', message: 'Привет'}]

