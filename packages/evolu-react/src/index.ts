export * from "@evolu/common/public";
import * as S from "@effect/schema/Schema";
import { Config, ConfigLive, Schema } from "@evolu/common";
import { EvoluCommonReact, EvoluCommonReactLive } from "@evolu/common-react";
import { EvoluCommonWebLive } from "@evolu/common-web";
import { Effect } from "effect";

// https://nextjs.org/docs/architecture/fast-refresh
let fastRefreshRef: EvoluCommonReact | null = null;

export const create = <From, To extends Schema>(
  schema: S.Schema<From, To>,
  config?: Partial<Config>,
): EvoluCommonReact<To> => {
  if (!fastRefreshRef)
    fastRefreshRef = EvoluCommonReact.pipe(
      Effect.provide(EvoluCommonReactLive),
      Effect.provide(EvoluCommonWebLive),
      Effect.provide(ConfigLive(config)),
      Effect.runSync,
    );
  fastRefreshRef.evolu.ensureSchema(schema);
  return fastRefreshRef as EvoluCommonReact<To>;
};
