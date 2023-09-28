import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  blockUnblock,
  deleteAccount,
  getAllUsers,
  getAllPosts,
  getUserStatus,
} from "../store/slices/userSlice";
import { CSVLink } from "react-csv";
import $ from "jquery";
import "datatables.net";
import Modal from "react-modal";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import '../index.css';
// function ValueLabelComponent(props: SliderValueLabelProps) {
//     const { children, value } = props;

//     return (
//       <Tooltip enterTouchDelay={0} placement="top" title={value}>
//         {children}
//       </Tooltip>
//     );
//   }

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

//   const marks = [
//     {
//       value: 0,
//     },
//     {
//       value: 20,
//     },
//     {
//       value: 37,
//     },
//     {
//       value: 100,
//     },
//   ];

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

Modal.setAppElement("#root");
const PostList = () => {
  const [id, setId] = useState();
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const status = useSelector(getUserStatus);
  const [userDetail, setUserDetail] = useState(null);
  const [getPost, setgetPost] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  // var csvData = [
  //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
  // ]
  // users?.map((item) =>
  //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
  // )

  console.log("userDetail", userDetail);
  console.log("form", form);
  function viewModal(item, type) {
    setIsOpen(true);
    console.log("item", item)
    if (type == "userDetail") {
      setUserDetail(item);
    } else if (type == "delete") {
      setId(item);
    } else if (type == "formDetail") {
      setForm(item?.form);
    }
    setModalType(type);
    setIsOpen(true);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "30%",
      height: modalType == "formDetail" ? "90%" : "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      // scrollbarColor: "red orange",
      // scrollbarWidth: "thin",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  // const accountDelete = async (id) => {
  //     try {
  //         await dispatch(deleteAccount(id)).unwrap()
  //         setIsOpen(false)
  //         $('#tableData')
  //             .DataTable().destroy();
  //         try {
  //             Users()
  //         } catch (rejectedValueOrSerializedError) {
  //             console.log(rejectedValueOrSerializedError)
  //         }
  //     } catch (rejectedValueOrSerializedError) {
  //         console.log(rejectedValueOrSerializedError)
  //     }
  // }

  const blockUnblockAccount = async (id) => {
    try {
      await dispatch(blockUnblock(id)).unwrap();
      $("#tableData").DataTable().destroy();
      try {
        Posts();
        closeModal();
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const Posts = async () => {
    try {
      // setUsers(null)
      const response = await dispatch(getAllPosts()).unwrap();
      console.log("get all posts ...>>> ", response?.data?.data);
      setgetPost(response?.data?.data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  function convertIndexToAlphabet(i) {
    var asciiOffset = 97; // ASCII code for 'A'
    return String.fromCharCode(i + asciiOffset);
  }

  useEffect(() => {
    let mount = true;
    if (mount) {
      Posts();
    }
    return () => {
      mount = false;
    };
  }, []);

  useEffect(() => {
    if (users) {
      $("#tableData").DataTable({
        lengthMenu: [10, 25, 50, 100, 200],
        language: {
          emptyTable: "Users Not Found",
        },
        destroy: true,
      });
    }
  }, [users]);

  return (

    <>
      <div className="card-container">
        {getPost?.map((item, index) => {
          return (
            <div key={index} className="custom-card">

              <div className="user-info">
                <img
                  src={`${process.env.REACT_APP_APIIMAGE}/${item?.userimage}`}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <h1>{item?.username}</h1>
              </div>

              <img
                src={`${process.env.REACT_APP_APIIMAGE}/${item?.postimage}`}
                alt="Post Image"
                className="post-image"
              />
              <div className="text-container">
                <h2>{item?.title}</h2>
                <p>{item?.description}</p>
              </div>


              <div className="card-icons">
                <FavoriteIcon fontSize="large" />
                <CommentIcon fontSize="large" />
              </div>

            </div>
          );
        })}
      </div>
    </>


  );
};
export default PostList;
