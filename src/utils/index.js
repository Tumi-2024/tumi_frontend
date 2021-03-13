
const TYPE_SALE = {
  '전체': false,
  '매매': 'sale',
  '전세': 'charter',
  '반전세': 'half-charter'
}

const TYPE_HOUSE = {
  '아파트': 'apartment',
  '재개발': false,
  '주택': 'house',
  '기타': 'etc'
}

const TYPE_HOUSE_DETAIL = {
  '전체': false,
  '상가': 'sale',
  '멸실 입주권': 'charter',
  '연립다세대': 'half-charter',
  '단독다가구': 'half-charter',
  '토지': 'half-charter',
  '뚜껑매물': 'half-charter',
  '1+1매물': 'half-charter'
}

const TYPE_SALE = {
  '전체': false,
  '매매': 'sale',
  '전세': 'charter',
  '반전세': 'half-charter'
}

const toQueryString = (params)  => {
  const condition = [];
  state = {
    typeSale: '전체',
    typeHouse: '아파트',
    typeHouseDetail: '전체',
    area: '10평대',
    salePrice: {
      text: '전체',
      min: 0,
      max: 0
    },
    depositPrice: {
      text: '전체',
      min: 0,
      max: 0
    },
    monthlyRentPrice: {
      text: '전체',
      min: 0,
      max: 0
    }
  }

  if (params.typeSale === '')

  

  http://127.0.0.1:9013/api/house/?latitude__range=37.54642299841696%2C37.56418237756464&longitude__range=127.01821048136249%2C127.03366000528827&price__range=2080000000,2090000000&type_sale=half-charter

};