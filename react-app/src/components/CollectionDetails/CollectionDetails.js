import React, { useEffect, useState, ulRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Masonry from "react-masonry-css";
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import SinglePost from '../Home/SinglePost';
import { SingleCollectionThunk } from '../../store/collection';
import { AllCollectionsThunk } from '../../store/collection';
import CollectionUpdateButton from './CollectionUpdateButton';
import RemovePostFromCollection from '../RemovePostFromCollection/RemovePostFromCollection';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./CollectionDetails.css";



export default function CollectionDetails() {
    const { collectionId } = useParams();
    const dispatch = useDispatch();
    const collection = useSelector(state => state.collections.singleCollection);
    const collectionsObj = useSelector((state) => state.collections.allCollections);
    const collections = collectionsObj ? Object.values(collectionsObj) : [];
    const user = useSelector((state) => state.session.user);
    const user_collections = collections.filter(collections => collections.user_id === user.id);
    const loading = useSelector((state) => state.collections.loading);
    const [collectionPosts, setCollectionPosts] = useState([])
    const [showDropdown, setShowDropdown] = useState(false);
    const [refresh, setRefresh] = useState('')
    const history = useHistory()



    useEffect(async () => {
        const res = await dispatch(AllCollectionsThunk(collection))
        const res1 = await dispatch(SingleCollectionThunk(collectionId))
            setCollectionPosts(res1.posts)
            setRefresh("")

    }, [dispatch, collectionId, refresh ]);


    if (loading) {
        return <p>Loading...</p>;
    }
    if (!collection) {
        return <p>Collection not found.</p>;
    }

const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
};

const handleAddPostClick = () => {
  history.push('/posts');
};


return (
    <div className='main-collection-details-container'>
        <div className='collection-details'>
        <div className='collection-name'>{collection.name}</div>
        <div className='collection-type'>{collection.type}</div>
        <div className='collection-description'>{collection.description}</div>
    </div>

    <div className='main-home-container1'>
        <div className='collection-dots-container'>

        <CollectionUpdateButton id="dots" user={user} collectionId={collection.id} />

        <p className='add-post1'>
              <button id="link-add-post-button1" onClick={handleAddPostClick}>
              <span className='duza-kropka'> ● </span> ADD POSTS TO COLLECTION
              </button>
            </p>

        {/* <div className="dropdown6"> */}
            <button
            onClick={toggleDropdown}
            className="home-button-your-collections1"
          >
              <span className='duza-kropka1'> ● </span>YOUR COLLECTIONS
            </button>
            <div className="dropdown6">
            {showDropdown && (
              <ul className="collection-list1">
                {user_collections.map((collection) => (
                  <li key={collection.id}>
                    <NavLink to={`/collections/${collection.id}`}>{collection.name}</NavLink>
                  </li>

                ))}
              </ul>
            )}
            {/* </div> */}
          </div>
        </div>


        <div className="image-grid">
        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 800: 2, 500: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {collectionPosts.map((post) => (
            <div className="post-card-container" key={post.id}>
              <SinglePost post={post} photoUrl={post.photoUrl} />
              <OpenModalButton
                className="menu-text1"
                buttonText="remove"
                modalComponent={<RemovePostFromCollection postId={post.id} setRefresh={setRefresh} />}
              />
            </div>
          ))}
        </Masonry>
          </div>
    </div>
    </div>

);
};
