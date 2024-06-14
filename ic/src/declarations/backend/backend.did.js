export const idlFactory = ({ IDL }) => {
  const EcdsaPublicKeyResponse = IDL.Record({
    'public_key' : IDL.Vec(IDL.Nat8),
    'chain_code' : IDL.Vec(IDL.Nat8),
  });
  const Block = IDL.Record({
    'miner' : IDL.Text,
    'totalDifficulty' : IDL.Nat,
    'receiptsRoot' : IDL.Text,
    'stateRoot' : IDL.Text,
    'hash' : IDL.Text,
    'difficulty' : IDL.Nat,
    'size' : IDL.Nat,
    'uncles' : IDL.Vec(IDL.Text),
    'baseFeePerGas' : IDL.Nat,
    'extraData' : IDL.Text,
    'transactionsRoot' : IDL.Opt(IDL.Text),
    'sha3Uncles' : IDL.Text,
    'nonce' : IDL.Nat,
    'number' : IDL.Nat,
    'timestamp' : IDL.Nat,
    'transactions' : IDL.Vec(IDL.Text),
    'gasLimit' : IDL.Nat,
    'logsBloom' : IDL.Text,
    'parentHash' : IDL.Text,
    'gasUsed' : IDL.Nat,
    'mixHash' : IDL.Text,
  });
  const User = IDL.Record({
    'user_principal' : IDL.Principal,
    'icp_address' : IDL.Text,
    'eth_address' : IDL.Text,
    'registered_at' : IDL.Int64,
  });
  const SignWithEcdsaResponse = IDL.Record({ 'signature' : IDL.Vec(IDL.Nat8) });
  return IDL.Service({
    'delete_user' : IDL.Func([], [], []),
    'get_ecdsa_public_key' : IDL.Func([], [EcdsaPublicKeyResponse], []),
    'get_latest_ethereum_block' : IDL.Func([], [Block], []),
    'get_registered_user' : IDL.Func([], [IDL.Opt(User)], []),
    'get_user' : IDL.Func([], [IDL.Opt(User)], []),
    'register_user' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'sign_hash_with_ecdsa' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [SignWithEcdsaResponse],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
