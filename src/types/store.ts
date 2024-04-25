import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";

/**
 * 转换类型
 * 把actions的type和payload映射一一对应的
 */
export type ExtractActionType<
  B extends Record<string, ActionCreatorWithPayload<any, any>>,
> =
  B[keyof B] extends ActionCreatorWithPayload<any, infer T>
    ? {
        [K in T]: ExtractActionPayload<B[keyof B], K>;
      }
    : never;

/**
 * 提取payload
 */
export type ExtractActionPayload<
  A extends ActionCreatorWithPayload<any, string>,
  K,
> =
  A extends ActionCreatorWithPayload<infer T, infer D>
    ? K extends D
      ? T
      : never
    : never;
