import Wrangler from './components/Wrangler';

function App() {
  return (
    <>
      <Wrangler
        nodes={[
          {
            label: 'Multiply',
            type: 'operation',
            inputs: { x: null, y: null },
            outputs: { product: null },
            operation: ({ x, y }) => {
              return { c: x * y };
            },
          },
          {
            label: 'console.log(a)',
            type: 'operation',
            inputs: { a: null },
            outputs: {},
            operation: ({ a }) => console.log(a),
          },
          {
            label: 'Value',
            type: 'scalar',
            inputs: {},
            outputs: { value: null },
            operation: () => ({ value: 4 }),
          },
          {
            label: 'Value',
            type: 'scalar',
            inputs: {},
            outputs: { value: null },
            operation: () => ({ value: 2 }),
          },
        ]}
      />
    </>
  );
}

export default App;

// <Wrangler.Operation
//   operation={(i, o) => {
//     const a = parseInt(i.get('a'));
//     const b = parseInt(i.get('b'));

//     o.set('product', (a * b).toString());
//   }}
//   label={'Multiply'}
//   inputSockets={[
//     <Wrangler.NodeInput key='a' label={'a'} />,
//     <Wrangler.NodeInput key='b' label={'b'} />,
//   ]}
//   outputSockets={[
//     <Wrangler.NodeOutput key='product' label={'product'} />,
//   ]}
// />
// <Wrangler.Operation
//   operation={(i) => {
//     console.log(i.get('content'));
//   }}
//   label={'Console Log'}
//   inputSockets={[
//     <Wrangler.NodeInput key='content' label={'content'} />,
//   ]}
//   initialPosition={{ x: 200, y: 200 }}
// />

// <Wrangler.Scalar
//   label={'Scalar'}
//   initialPosition={{ x: 300, y: 300 }}
// />
