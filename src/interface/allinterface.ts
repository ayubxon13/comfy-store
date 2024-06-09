export interface userData {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
}

export interface featuredInt {
  data: {
    data: [
      {
        id: string
        attributes: {
          title: string
          image: string
          price: string
          company: string
        }
      }
    ]
  }
  meta: {}
}

export interface singleData {
  data: {
    data: {
      attributes: {
        title: string
        image: string
        price: string
        company: string
        description: string
        colors: string[]
      }
      id: number
    }
  }
  amount?: number
  meta?: {}
}

export interface allData {
  data: {
    data: [
      {
        id: number
        attributes: {
          title: string
          company: string
          description: string
          featured: false
          createdAt: string
          updatedAt: "2023-08-10T10:04:29.084Z"
          publishedAt: string
          category: string
          image: string
          price: string
          shipping: true
          colors: string[]
        }
      }
    ]
    meta: {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
  }
}

export interface orders {
  data: {
    data: [
      {
        attributes: {
          address: string
          cartItems: [
            {
              image: string
              amount: number
              cartID: string
              company: string
              price: string
              productColor: string
              productID: number
              title: string
            }
          ]
          createdAt: string
          name: string
          numItemsInCart: number
          orderTotal: string
          publishedAt: string
          updatedAt: string
        }
        id: number
      }
    ]
    meta: {
      pagination: {
        page: number
        pageCount: number
        pageSize: number
        total: number
      }
    }
  }
}
