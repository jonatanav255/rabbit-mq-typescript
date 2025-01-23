import amqp from 'amqplib'

async function consumeMessages() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'logs';

    // Declare the same exchange as the publisher
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    // Create a temporary queue (exclusive: true means the queue will be deleted when the connection closes)
    const { queue } = await channel.assertQueue('', { exclusive: true });

    // Bind the queue to the exchange
    channel.bindQueue(queue, exchange, '');

    console.log('[*] Waiting for messages. To exit, press CTRL+C');

    // Consume messages from the queue
    channel.consume(queue, (msg) => {
        if (msg.content) {
            console.log(`[x] Received: ${msg.content.toString()}`);
        }
    }, { noAck: true });
}

consumeMessages();