class Phone:
	def __init__(self, phone_number):
		self.phone_number = phone_number
		self.call_history = []
		self.messages = []

	def call(self, other_phone):
		call_details = f"{self.phone_number} called {other_phone.phone_number}"
		self.call_history.append(call_details)
		print(call_details)

	def show_call_history(self):
		print(self.call_history)

	def send_message(self, other_phone, content):
		message = {
			"to": other_phone.phone_number,
			"from": self.phone_number,
			"content": content,
		}
		self.messages.append(message)
		other_phone.messages.append(message)

	def show_outgoing_messages(self):
		outgoing_messages = [
			message for message in self.messages
			if message["from"] == self.phone_number
		]
		print(outgoing_messages)

	def show_incoming_messages(self):
		incoming_messages = [
			message for message in self.messages
			if message["to"] == self.phone_number
		]
		print(incoming_messages)

	def show_messages_from(self, phone_number):
		messages_from_phone = [
			message for message in self.messages
			if message["from"] == phone_number
		]
		print(messages_from_phone)


if __name__ == "__main__":
	phone_one = Phone("0112534765")
	phone_two = Phone("0101963587")

	phone_one.call(phone_two)