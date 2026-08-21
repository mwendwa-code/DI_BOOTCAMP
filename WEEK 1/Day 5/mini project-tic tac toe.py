def display_board(board):
    print("\n   1   2   3")
    for i, row in enumerate(board, start=1):
        print(f"{i}  {' | '.join(cell if cell != ' ' else ' ' for cell in row)}")
        if i != 3:
            print("  -----------")
    print()


def player_input(board, player):
    while True:
        try:
            row = int(input(f"Player {player}, choose a row (1-3): ")) - 1
            col = int(input(f"Player {player}, choose a column (1-3): ")) - 1
        except ValueError:
            print("Please enter numbers only.")
            continue

        if row not in range(3) or col not in range(3):
            print("Please choose a valid position between 1 and 3.")
            continue

        if board[row][col] != ' ':
            print("That position is already taken. Try again.")
            continue

        return row, col


def check_win(board, player):
    win_combinations = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
    ]

    for combo in win_combinations:
        if combo == [player, player, player]:
            return True
    return False


def check_tie(board):
    for row in board:
        for cell in row:
            if cell == ' ':
                return False
    return True


def switch_player(player):
    return 'O' if player == 'X' else 'X'


def play():
    board = [[' ' for _ in range(3)] for _ in range(3)]
    current_player = 'X'

    while True:
        display_board(board)
        row, col = player_input(board, current_player)
        board[row][col] = current_player

        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins!")
            break

        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break

        current_player = switch_player(current_player)


if __name__ == "__main__":
    play()
