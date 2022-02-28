from cryptography.fernet import Fernet



# def write_key():
#     key = Fernet.generate_key()
#     with open("key.key", 'wb') as f:
#         f.write(key)
# write_key()

def load_key():
    file = open('key.key', 'rb')
    key = file.read()
    file.close()
    return key

master_pwd = input("What is the master password? ")
key = load_key() + master_pwd.encode()
fer = Fernet(key)



def view():
    with open('password.txt', 'r') as f:
        for line in f.readlines():
            data = line.rstrip()
            user, pwd = data.split('|')
            print(f"User: {user}, Password: {fer.decrypt(pwd.encode()).decode()}")
# python byte format is b'something'
def add():
    name = input('Account Name: ')
    pwd = input('Password: ')

    with open('password.txt', 'a') as f:
        f.write(name + "|" + fer.encrypt(pwd.encode()).decode() + '\n')


while True: 
    mode = input("view or add password? (view|add) or press q to quit ").lower()
    if mode == "q":
        break

    elif mode == 'view': 
        view()
    elif mode == 'add':
        add()
    else:
        print('invalid mode')
        continue