import amqp from 'amqplib'

const consumeTask = async (consumerName: string) => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'
    const connection = await amqp.connect(url)

    console.log(`[${consumerName}] Connected to Rabbit MQ`)

    const channel = await connection.createChannel()
    const queueName = 'work_queue'

    await channel.assertQueue(queueName, { durable: true })

    console.log(`[${consumerName}] Waiting for messages in '${queueName}'...`)
  } catch (error) {}
}
