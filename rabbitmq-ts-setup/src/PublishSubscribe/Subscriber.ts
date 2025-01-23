import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';

async function consumeMessages(): Promise<void> {
    try {
        // Step 1: Establish connection to RabbitMQ server
        const connection: Connection = await amqp.connect('amqp://localhost');
        const channel: Channel = await connection.createChannel();

        const exchange = 'logs';

        // Step 2: Declare the same exchange as the publisher (type: 'fanout')
        await channel.assertExchange(exchange, 'fanout', { durable: false });

        // Step 3: Create a temporary queue (exclusive: true)
        const { queue } = await channel.assertQueue('', { exclusive: true });

        // Step 4: Bind the temporary queue to the exchange
        await channel.bindQueue(queue, exchange, '');

        console.log('[*] Waiting for messages. To exit, press CTRL+C');

        // Step 5: Consume messages from the queue
        channel.consume(
            queue,
            (msg: ConsumeMessage | null) => {
                if (msg) {
                    console.log(`[x] Received: ${msg.content.toString()}`);
                }
            },
            { noAck: true } // Automatically acknowledge messages
        );
    } catch (error) {
        console.error('Error consuming messages:', error);
    }
}

consumeMessages();
