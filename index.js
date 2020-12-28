function checkCashRegister(price, cash, cid) {
    let chg = []
    let bal;
    
    const cashID = cid.filter(cid => {
      return (cid[0] === 'ONE' || cid[0] === 'FIVE' || cid[0] === 'TEN' || cid[0] === 'TWENTY' || cid[0] === 'ONE HUNDRED' )
    })
    cashID.reverse()
  
    const coinID = cid.filter(cid => {
      return (cid[0] === 'PENNY' || cid[0] === 'NICKEL' || cid[0] === 'DIME' || cid[0] === 'QUARTER')
    })
    coinID.reverse()
  
  const cashInDrawer = parseInt((cashID.map(cash => Math.floor(cash[1]))).reduce((x, y) => x + y))
  
  const coinInDrawer = parseFloat(((coinID.map(cash => cash[1])).reduce((x, y) => x + y)).toFixed(2))
      
  let cashDue = parseInt(Math.floor(cash - price))
  let coinDue = parseFloat(((cash - price) - cashDue).toFixed(2))
  
  // first check 
  if(cashInDrawer < cashDue || coinInDrawer < coinDue || (cashInDrawer + coinInDrawer) < (cashDue + coinDue)) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] }
  }
  
  // second check 
  if((cashInDrawer + coinInDrawer) == (cashDue + coinDue)){
    
    return { status: 'CLOSED', change: cid }
  }
  
  else {
    if(cashDue) {
        for(let cash of cashID) {
          
          let moneyEquiv = cash[0] === 'ONE HUNDRED' ? 100 : cash[0] === 'TWENTY' ? 20 : cash[0] === 'TEN' ? 10 : cash[0] === 'FIVE' ? 5 : cash[0] === 'ONE' ? 1 : ''
          
          let count= 0
          
          if (cashDue > 0) {
  
            while (cash[1] !== 0 && cashDue >= moneyEquiv && cash[1] >= moneyEquiv){
              cashDue = cashDue - moneyEquiv
              cash[1] -= moneyEquiv
              count += 1
            }
            if (moneyEquiv*count !== 0) { chg.push([cash[0], moneyEquiv*count]) }
  
            else { continue }
        }
      }
    }
    if(coinDue) {
  
        for ( let coin of coinID ) {
  
          let moneyEquiv = coin[0] === 'QUARTER' ? 0.25 : coin[0] === 'DIME' ? 0.1 : coin[0] === 'NICKEL' ? 0.05 : coin[0] === 'PENNY' ? 0.01 : ''
  
          let count = 0;
  
          if(coinDue > 0) {
  
            while (coin[1] !== 0 && coinDue >= moneyEquiv && coin[1] >= moneyEquiv){
              coinDue = (coinDue - moneyEquiv).toFixed(2)
              coin[1] -= moneyEquiv
              count += 1
            }
            if (moneyEquiv*count !== 0) { chg.push([coin[0], moneyEquiv*count]) }
  
            else { continue }
          }
        }
       
      }
      return { status: "OPEN", change: chg }
    }
  }
  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
  )
  