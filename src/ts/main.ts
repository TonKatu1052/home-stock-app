type Stock = Record<string, number>

const app = document.getElementById('app')!

const params = new URLSearchParams(location.search)
const path = location.pathname

const item = params.get('item') ?? 'egg'
const count = Number(params.get('count') ?? 0)

const getStock = (): Stock =>
  JSON.parse(localStorage.getItem('stock') ?? '{}')

const saveStock = (stock: Stock) =>
  localStorage.setItem('stock', JSON.stringify(stock))

const render = (html: string) => {
  app.innerHTML = html
}

// ---- ROUTING ----
if (path.startsWith('/home-stock-app/add')) {
  const stock = getStock()
  stock[item] = (stock[item] ?? 0) + count
  saveStock(stock)

  render(`
    <h2>追加完了</h2>
    <p>${item} +${count}</p>
    <pre>${JSON.stringify(stock, null, 2)}</pre>
    <a href="/home-stock-app/">戻る</a>
  `)
}
else if (path.startsWith('/check')) {
  const stock = getStock()
  const value = stock[item] ?? 0

  render(`
    <h2>在庫確認</h2>
    <p>${item}: ${value}</p>
    <a href="/home-stock-app/">戻る</a>
  `)
}
else {
  const stock = getStock()

  render(`
    <h2>現在の在庫</h2>
    <pre>${JSON.stringify(stock, null, 2)}</pre>

    <h3>テストリンク</h3>
    <ul>
      <li><a href="/home-stock-app/add?item=egg&count=1">卵 +1</a></li>
      <li><a href="/home-stock-app/check?item=egg">卵確認</a></li>
    </ul>
  `)
}
