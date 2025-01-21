import amqp from 'amqplib'

const consumeTask = async (consumerName: string) => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'
    const connection = await amqp.connect(url)

    console.log(`[${consumerName}] Connected to Rabbit MQ`)

    const channel = await connection.createChannel()

    channel.prefetch(1); 
    const queueName = 'work_queue'

    await channel.assertQueue(queueName, { durable: true })

    console.log(`[${consumerName}] Waiting for messages in '${queueName}'...`)

    channel.consume(
      queueName,
      msg => {
        if (msg) {
          console.log(`[${consumerName}] Received: ${msg.content.toString()}`)
          // Simulate task processing
          setTimeout(() => {
            console.log(
              `[${consumerName}] Done processing: ${msg.content.toString()}`
            )
            channel.ack(msg) // Acknowledge message as processed
          }, 1000) // Simulate 1 second of processing time
        }
      },
      { noAck: false } // Ensure manual acknowledgment is enabled
    )
  } catch (error) {}
}

consumeTask("Consumer 1")
