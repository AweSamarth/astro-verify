export const ADDRESS="0xF688092Fd289a33c1aB3cf23f462Bda885940A9A"
export const ABI = [
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "company_id",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "newCompany",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_totalSupply",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_imageUrl",
        "type": "string"
      }
    ],
    "name": "newPart",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "newRegistry",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "part_id",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "viewCompany",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "companyId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "companyName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "companyTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "partsArray",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct AstroVerify.Company",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "viewPart",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "partId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "companyAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "partName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "counter",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalSupply",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "partTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "imageUrl",
            "type": "string"
          }
        ],
        "internalType": "struct AstroVerify.Part",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_serialNo",
        "type": "string"
      }
    ],
    "name": "viewRegistry",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "partId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "serialNo",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "registryTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "internalType": "struct AstroVerify.Registry",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]