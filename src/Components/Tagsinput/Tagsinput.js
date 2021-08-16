// import React from 'react';

// import './Tagsinput.css';


// class Tagsinput extends React.Component {
//     constructor(props) {
//       super(props);
      
//       this.state = {
//         tags: [
//           'milk',
//           'nuts'
//         ]
//       };
//       this.inputconfirm.bind(this)
//     }
//     //json,stringify,phares//in backend
//     removeTag = (i) => {
//       const newTags = [ ...this.state.tags ];
//       newTags.splice(i, 1);
//       this.setState({ tags: newTags });
//     }
  
//     inputKeyDown = (e) => {
//       const val = e.target.value;
//       if (e.key === 'Enter' && val) {
//         if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
//           return;
//         }
//         this.setState({ tags: [...this.state.tags, val] });
        
//         this.tagInput.value = null;
//       } else if (e.key === 'Backspace' && !val) {
//         this.removeTag(this.state.tags.length - 1);
//       }
//     }
//   inputconfirm = () => {
//     const usertag = JSON.stringify(this.state)
//     console.log(usertag)
//     }
  
//     render() {
//       const { tags } = this.state;
  
//       return (
//         <div className="input-tag">
//           <ul className="input-tag__tags">
//             { tags.map((tag, i) => (
//               <li key={tag}>
//                 {tag}
//                 <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
//               </li>
//             ))}
//             <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
//           <button type="button" onClick={()=>this.props.inputconfirm(this.state.tags)} ref="confirmTags">confirm</button>
//           </ul>
//         </div>
//       );
//     }
//   }



// export default Tagsinput;