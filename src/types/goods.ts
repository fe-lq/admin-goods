export interface Goods {
  id: number;
  goodsName: string;
  goodsPrice: number;
  goodsAmount: number;
  goodsImgs: string[];
  goodsOnSale: boolean;
  goodsDesc?: string;
  goodsIsDel?: boolean;
}

export type FormGoods = Partial<Goods> & { id?: number };
