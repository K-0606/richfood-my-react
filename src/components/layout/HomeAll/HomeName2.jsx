import * as React from 'react';

export default class HomeName extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '10vh', paddingTop: '20px' }}>
        <h1 style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
        依菜系搜尋餐廳
        </h1>
      </div>
    );
  }
}
