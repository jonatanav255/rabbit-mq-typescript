import amqp from 'amqplib' // Import the library.

const queueName = 'simpleQueue' // Queue name to consume from.

const receiveMessage = async () => {
  const connection = await amqp.connect('ampq://localhost')
  const channel = await connection.createChannel()

  await channel.assertQueue(queueName, { durable: true })

  console.log(`[x] Waiting for messages in ${queueName}`) // Inform the user that the consumer is ready.

  channel.consume(queueName, msg => {
    if (msg) {
      console.log(`[x] Received: ${msg.content.toString()}`)
      channel.ack(msg);
    }
  })
}
