import amqp from 'amqplib'

async function publishMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'logs';

    // Declare an exchange of type 'fanout' (broadcasts to all queues)
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    const message = 'Hello, RabbitMQ!';
    channel.publish(exchange, '', Buffer.from(message));
    console.log(`[x] Sent: ${message}`);

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

publishMessage();