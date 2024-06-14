import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Block {
  'miner' : string,
  'totalDifficulty' : bigint,
  'receiptsRoot' : string,
  'stateRoot' : string,
  'hash' : string,
  'difficulty' : bigint,
  'size' : bigint,
  'uncles' : Array<string>,
  'baseFeePerGas' : bigint,
  'extraData' : string,
  'transactionsRoot' : [] | [string],
  'sha3Uncles' : string,
  'nonce' : bigint,
  'number' : bigint,
  'timestamp' : bigint,
  'transactions' : Array<string>,
  'gasLimit' : bigint,
  'logsBloom' : string,
  'parentHash' : string,
  'gasUsed' : bigint,
  'mixHash' : string,
}
export interface EcdsaPublicKeyResponse {
  'public_key' : Uint8Array | number[],
  'chain_code' : Uint8Array | number[],
}
export interface SignWithEcdsaResponse { 'signature' : Uint8Array | number[] }
export interface User {
  'user_principal' : Principal,
  'icp_address' : string,
  'eth_address' : string,
  'registered_at' : bigint,
}
export interface _SERVICE {
  'delete_user' : ActorMethod<[], undefined>,
  'get_ecdsa_public_key' : ActorMethod<[], EcdsaPublicKeyResponse>,
  'get_latest_ethereum_block' : ActorMethod<[], Block>,
  'get_registered_user' : ActorMethod<[], [] | [User]>,
  'get_user' : ActorMethod<[], [] | [User]>,
  'register_user' : ActorMethod<[string, string], undefined>,
  'sign_hash_with_ecdsa' : ActorMethod<
    [Uint8Array | number[]],
    SignWithEcdsaResponse
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
