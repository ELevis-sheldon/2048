// 获取键盘
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //左
            // moveleft()方法
            // 完成向左移动 返回值为bool值
            if (moveLeft()) {
                //移动完成 生成一个新的数字
                setTimeout(" generateOneNumber();", 210);
                //判断 当次移动完成之后,游戏是否结束
                // isgameover();
                setTimeout("isgameover();", 300);
            }
            break;
        case 38: //上
            if (moveUp()) {
                //移动完成 生成一个新的数字
                setTimeout(" generateOneNumber();", 210);
                //判断 当次移动完成之后,游戏是否结束
                // isgameover();
                setTimeout("isgameover();", 300);
            }
            break;
        case 39: //右
            if (moveRight()) {
                //移动完成 生成一个新的数字
                setTimeout(" generateOneNumber();", 210);
                //判断 当次移动完成之后,游戏是否结束
                // isgameover();
                setTimeout("isgameover();", 300);
            }
            break;
        case 40: //下
            if (moveDown()) {
                //移动完成 生成一个新的数字
                setTimeout(" generateOneNumber();", 210);
                //判断 当次移动完成之后,游戏是否结束
                // isgameover();
                setTimeout("isgameover();", 300);
            }
            break;
        default:
            break;
    }
});

function moveLeft() {
    if (!canMoveLeft(board)) {
        // 当前格子无法移动
        return false;
    }
    //完成向左移动的逻辑
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //当前数字格有值的 一定不是0
            if (board[i][j] != 0) {
                //向左移动的逻辑
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
                        //才能向左移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board)) {
                        //才能向左移动
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();", 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    //moveUp
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    //moveDown
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    alert("gameover!");
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}