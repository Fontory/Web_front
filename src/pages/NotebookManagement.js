import React, { useState } from 'react';

const SERVER_URL = 'http://ceprj.gachon.ac.kr:60023';

const NotebookManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sheets, setSheets] = useState([
    {
      sheetId: 1,
      imageUrl: '/preview/sheet_f651b832-f46d-4397-8f12-30cdc7c97ca0.png',
      phrase: '예쁘게 쓰고 싶은 마음으로',
      nickname: '유저1',
    },
    {
      sheetId: 2,
      imageUrl: '/preview/sheet_cee26df4-a724-48f4-86ef-2b008f618daa.png',
      phrase: '반복이 글씨체를 만든다',
      nickname: '유저1',
    },
    {
      sheetId: 3,
      imageUrl: '/preview/sheet_b9e88db1-f4b5-4a9e-9894-f6ae7ea877b2.png',
      phrase: '오늘은 날씨가 참 맑습니다',
      nickname: '유저1',
    },
    {
      sheetId: 4,
      imageUrl: '/preview/sheet_d53c5777-d672-428a-9054-0cdb035dd497.png',
      phrase: '시작하는 가장 좋은 방법은 말하는 것을 멈추고 행동하는 것이다.',
      nickname: '유저1',
    },
    {
      sheetId: 5,
      imageUrl: '/preview/sheet_0ee2c2b5-f938-4afd-b5d0-a6ca7eba5962.png',
      phrase: '열심히 쓰면 예쁜 글씨가 된다',
      nickname: '유저1',
    },
    {
      sheetId: 6,
      imageUrl: '/preview/sheet_75679fcc-508b-4070-b7bb-f60e206340ce.png',
      phrase: '아무 일도 없었지만 그게 행복',
      nickname: '유저1',
    },
    {
      sheetId: 10,
      imageUrl: '/preview/sheet_4b76b426-c28b-4ffc-8e57-54ac7db0773c.png',
      phrase: '아는게 힘이다.',
      nickname: '유저2',
    },
    {
      sheetId: 14,
      imageUrl: '/preview/sheet_47ef1732-4176-44c7-9ecd-f5d71a4d224d.png',
      phrase: '폰토리체 연습장글',
      nickname: '유저1',
    },
    {
      sheetId: 15,
      imageUrl: '/preview/sheet_7442cdeb-3017-4092-9f6d-31239aa9c044.png',
      phrase: '하루를 정성껏 살아낸 사람은,\n그 어떤 미래도 두렵지 않다.\n성장은 늘 느리게 오지만,\n멈추지만 않으면 반드시 도착한다.\n오늘도, 어제보다 한 걸음이면 충분하다.',
      nickname: '유저1',
    },
    {
      sheetId: 20,
      imageUrl: '/preview/sheet_2209c73b-ebbe-4a3a-876f-2fd730997a37.png',
      phrase: '하루를 정성껏 살아낸 사람은,\n그 어떤 미래도 두렵지 않다.\n성장은 늘 느리게 오지만,\n멈추지만 않으면 반드시 도착한다.\n오늘도, 어제보다 한 걸음이면 충분하다.',
      nickname: '유저1',
    },
  ]);

  const handleSearch = () => {
    console.log('🔍 검색어:', searchTerm);
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#fafafa' }}>
      <h2 style={{ marginBottom: '20px' }}>연습장 관리</h2>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="문구 또는 사용자 검색"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '220px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {sheets.map((sheet) => (
          <div key={sheet.sheetId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '160px' }}>
            <img
              src={`${SERVER_URL}${sheet.imageUrl}`}
              alt={sheet.phrase}
              style={{ width: '120px', height: '160px', objectFit: 'cover', border: '1px solid #ccc', marginBottom: '8px' }}
            />
            <p>{sheet.phrase}</p>
            <p>작성자: {sheet.nickname}</p>
            <a
              href={`${SERVER_URL}${sheet.imageUrl}`}
              style={{
                textDecoration: 'none',
                padding: '4px 8px',
                backgroundColor: '#222',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                marginTop: '4px',
              }}
              download
            >
              다운로드
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#fafafa',
  },
  searchBar: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '220px',
  },
  searchButton: {
    background: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  imageContainer: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '160px',
  },
  image: {
    width: '120px',
    height: '160px',
    objectFit: 'cover',
    border: '1px solid #ccc',
    marginBottom: '8px',
  },
  downloadButton: {
    textDecoration: 'none',
    padding: '4px 8px',
    backgroundColor: '#222',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    marginTop: '4px',
  },
};

export default NotebookManagement;
