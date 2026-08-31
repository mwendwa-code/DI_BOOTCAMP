class BankAccount:
	def __init__(self, balance=0, username="", password=""):
		self.balance = balance
		self.username = username
		self.password = password
		self.authenticated = False

	def authenticate(self, username, password):
		if username == self.username and password == self.password:
			self.authenticated = True
			return True
		return False

	def _require_authentication(self):
		if not self.authenticated:
			raise Exception("You must authenticate before using the account")

	def deposit(self, amount):
		self._require_authentication()
		if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
			raise Exception("Deposit amount must be a positive integer")
		self.balance += amount

	def withdraw(self, amount):
		self._require_authentication()
		if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
			raise Exception("Withdrawal amount must be a positive integer")
		self.balance -= amount


class MinimumBalanceAccount(BankAccount):
	def __init__(self, balance=0, username="", password="", minimum_balance=0):
		super().__init__(balance, username, password)
		self.minimum_balance = minimum_balance

	def withdraw(self, amount):
		self._require_authentication()
		if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
			raise Exception("Withdrawal amount must be a positive integer")
		if self.balance - amount <= self.minimum_balance:
			raise Exception("Withdrawal would go below the minimum balance")
		self.balance -= amount


class ATM:
	def __init__(self, account_list, try_limit):
		if not isinstance(account_list, list) or not all(
			isinstance(account, BankAccount) for account in account_list
		):
			raise Exception("account_list must contain bank accounts")

		try:
			if not isinstance(try_limit, (int, float)) or isinstance(try_limit, bool) or try_limit <= 0:
				raise ValueError
		except ValueError:
			print("Invalid try limit; using 2 attempts instead")
			try_limit = 2

		self.account_list = account_list
		self.try_limit = try_limit
		self.current_tries = 0
		self.running = True
		self.show_main_menu()

	def show_main_menu(self):
		while self.running and self.current_tries < self.try_limit:
			print("\n1. Log in\n2. Exit")
			choice = input("Choose an option: ").strip()
			if choice == "1":
				username = input("Username: ")
				password = input("Password: ")
				self.log_in(username, password)
			elif choice == "2":
				self.running = False
			else:
				print("Invalid option")

	def log_in(self, username, password):
		for account in self.account_list:
			if account.authenticate(username, password):
				self.show_account_menu(account)
				return account

		self.current_tries += 1
		print("Invalid username or password")
		if self.current_tries >= self.try_limit:
			print("You reached the maximum number of tries")
			self.running = False
		return None

	def show_account_menu(self, account):
		while self.running:
			print(f"\nBalance: {account.balance}")
			print("1. Deposit\n2. Withdraw\n3. Exit")
			choice = input("Choose an option: ").strip()
			if choice == "1":
				try:
					account.deposit(int(input("Amount to deposit: ")))
				except (ValueError, Exception) as error:
					print(error)
			elif choice == "2":
				try:
					account.withdraw(int(input("Amount to withdraw: ")))
				except (ValueError, Exception) as error:
					print(error)
			elif choice == "3":
				return
			else:
				print("Invalid option")


if __name__ == "__main__":
	account = BankAccount(100, "sara", "secret")
	account.authenticate("sara", "secret")
	account.deposit(50)
	account.withdraw(25)

#