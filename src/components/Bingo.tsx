'use client'

import { useState, useEffect, CSSProperties } from 'react'

type Cell = {
  text: string
  marked: boolean
}

const predefinedContent = [
  "小さな公園", "面白いアート作品（落書き、彫刻）", "レトロな店", "四つ葉のクローバー", "街中の隠れた小道", "自動販売機の新商品",
  "手作り看板", "農産物直売所", "小さな橋や川", "鳥のさえずり",
  "散歩してる犬", "期間限定のイベント告知ポスター", "ベンチで本を読んでいる人", "かわいい形の葉っぱ",
  "猫", "行ったことない飲食店", "座れる大きな岩", "オープンカー",
  "かわいいレンガ道", "公園の噴水", "変な形の雲", "風船",
  "面白い形の石", "キッチンカー", "植物のアーチ"
]

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  card: {
    backgroundColor: 'white',
    marginTop: '1rem',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '1rem',
  },
  cell: {
    width: '6rem',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '0.5rem',
  },
  markedCell: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  button: {
    width: '100%',
    padding: '0.5rem 1rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  popup: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.5rem',
    textAlign: 'center',
  },
  popupTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  popupButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
}

export default function EnhancedStyledFixedBingoApp() {
  const [card, setCard] = useState<Cell[][]>([])
  const [showBingoPopup, setShowBingoPopup] = useState(false)

  useEffect(() => {
    generateNewCard()
  }, [])

  const generateNewCard = () => {
    const shuffled = [...predefinedContent].sort(() => 0.5 - Math.random())
    const newCard = Array(3).fill(null).map(() => 
      Array(3).fill(null).map(() => ({ 
        text: shuffled.pop() || '', 
        marked: false 
      }))
    )
    setCard(newCard)
    setShowBingoPopup(false)
  }

  const toggleCellMark = (row: number, col: number) => {
    const newCard = card.map((r, i) => 
      r.map((c, j) => 
        i === row && j === col ? { ...c, marked: !c.marked } : c
      )
    )
    setCard(newCard)
    checkBingo(newCard)
  }

  const checkBingo = (currentCard: Cell[][]) => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (currentCard[i].every(cell => cell.marked) || 
          currentCard.every(row => row[i].marked)) {
        setShowBingoPopup(true)
        return
      }
    }

    // Check diagonals
    if (currentCard.every((row, i) => row[i].marked) ||
        currentCard.every((row, i) => row[2 - i].marked)) {
      setShowBingoPopup(true)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>さんぽビンゴ</h1>
      <p>見つけたら写真を撮って記録！！</p>
      <div style={styles.card}>
        <div style={styles.grid}>
          {card.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                style={{
                  ...styles.cell,
                  ...(cell.marked ? styles.markedCell : {})
                }}
                onClick={() => toggleCellMark(rowIndex, colIndex)}
              >
                {cell.text}
              </button>
            ))
          )}
        </div>
        <button
          onClick={generateNewCard}
          style={styles.button}
        >
          新しいカード
        </button>
      </div>

      {showBingoPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2 style={styles.popupTitle}>ビンゴ！</h2>
            <p style={{ marginBottom: '1rem' }}>おめでとうございます！いい散歩ライフを！</p>
            <button
              onClick={() => setShowBingoPopup(false)}
              style={styles.popupButton}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  )
}