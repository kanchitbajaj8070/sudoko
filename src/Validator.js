export const validateSudoko=(board)=>
{

    for( let i=0;i<board.length;i++) {
        for (let j = 0; j < board[i].length; j++)
        {
        if( board[i][j]===0)
            return false;
        if( !isSafe(board,9,i,j,board[i][j]))
            return false;
            }
        }
    return true;
    }
function isSafe( board,n,r,c,key)
{
    for (let  i = 0; i < board.length; i++) {
        if ((i !== r &&board[i][c]===key))
            return false;
    }
    for (let  i = 0; i < board.length; i++) {
        if ((i !== c && board[r][i] === key))
            return false;
    }
    let k=r-(r%3);
    let l=c-(c%3);
    for (let i = k; i <k+3 ; i++) {
        for (let j = l; j <l+3 ; j++) {
           if( i===r&&j===c)
               continue;
            if( board[i][j]===key)
                return false;
        }
    }
    return true;
}