import React from 'react';
import axios from 'axios';
import { getReviews, sendReview } from '../../utils/endpoints';
import moment from 'moment';
import { BigLoader } from '../Loader';
import { useSelector } from 'react-redux';
import Link from 'next/link';
interface PsychologistHeaderProps {
  psychologist: {
    first_name: string;
    last_name: string;
    cedula: Number;
    address: string;
    email: string;
    username: string;
    password: string;
    slug: string;
    role: string;
    bio: string;
    avatar: string;
    created_at: any;
    _id: any;
    precioConsulta: any;
  };
}

const PsychologistHeader = ({ psychologist }: PsychologistHeaderProps) => {
  const {
    first_name,
    last_name,
    cedula,
    address,
    email,
    username,
    password,
    slug,
    role,
    bio,
    avatar,
    created_at,
    _id,
    precioConsulta,
  } = psychologist;
  const [requestConversation, setRequestConversation] = React.useState(false);

  const { user, loading } = useSelector((state: any) => state.auth);

  return (
    <div className="py-4">
      <div className="bg-purple-700 w-32 h-32 mx-auto rounded-full shadow-lg overflow-hidden">
        <img src={avatar} className="w-full h-full object-cover" alt="Avatar" />
      </div>
      <div className="flex pt-4">
        <div className="flex-1 px-6">
          {first_name && last_name && (
            <h3 className="font-bold capitalize text-4xl text-center block w-full">{`${first_name} ${last_name}`}</h3>
          )}
          <p className="text-center text-gray-500">@{username}</p>
          <p className="text-justify my-4 border-l-4 border-purple-700 pl-4 rounded">
            {bio}
          </p>
          <p className="absolute hidden lg:block px-3 font-semibold bg-purple-200 rounded border-2 border-purple-500">
            Precio de consulta: {precioConsulta}$
          </p>
          <div className="flex justify-center py-2">
            {user._id != psychologist._id && (
              <Link href={`/payment/${slug}`}>
                <button
                  className={`
                    'w-full lg:w-auto shadow focus:outline-none py-2 px-2 rounded bg-purple-500 text-gray-200 
                    ${
                      requestConversation
                        ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'
                    }
                    `}
                >
                  Chatear!
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Reviews({ slug }: any) {
  const [reviews, setReviews] = React.useState<Array<any>>([]);
  const [psychologist, setPsychologist] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [sendingComment, setSendingComment] = React.useState(false);

  // Making request to get reviews of psychologist
  React.useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const loadData = async function () {
      try {
        if (slug) {
          const res = await axios.get(getReviews(slug + ''), config);
          setReviews(res.data.data.reviews);
          console.log('reviews', res.data.data.reviews);
          setPsychologist(res.data.data.psychologist);
          setLoading(false);
        }
      } catch (err) {}
    };

    loadData();
  }, [slug]);

  // Submit comment
  const sendComment = (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const sendData = async function () {
      try {
        if (comment.length > 0) {
          setSendingComment(true);
          const data = {
            slug_psicologo: slug,
            content: comment,
          };
          const res = await axios.post(sendReview, data, config);
          const newComment: any = await res.data.data;
          setReviews([...reviews, newComment]);
          setComment('');
          setSendingComment(false);
        }
      } catch (err) {}
    };

    sendData();
  };

  return (
    <div className="flex">
      {loading && (
        <div className="w-full h-screen flex justify-center items-center overflow-hidden">
          <BigLoader />
        </div>
      )}
      {!loading && (
        <div className="w-full relative flex flex-col">
          {/* Medico Bio */}
          <PsychologistHeader psychologist={psychologist as any} />
          {/* Comments */}
          <hr />
          <div className="">
            <h1 className="font-bold text-5xl text-center py-10 tracking-wide border-b border-400-gray leading-none px-6 uppercase">
              Reseñas
            </h1>
            {/* Comentarios */}
            <div
              className="overflow-y-auto custom-scroll"
              style={{ maxHeight: '400px' }}
            >
              {reviews.length === 0 && (
                <div className="bg-gray-100 w-full flex flex-col justify-center items-center p-6">
                  <img
                    src="/assets/icons/empty.svg"
                    className="w-48 h-48"
                    alt="Empty State"
                  />
                  <p className="text-xl font-light text-gray-800 uppercase pt-4 px-6 text-center">
                    No hay nada por aquí. Se el primero en redactar una reseña
                    de tu doctor!
                  </p>
                </div>
              )}

              {reviews.length > 0 &&
                reviews.map((review: any, index: number) => (
                  <div
                    key={review._id}
                    className={`w-full border-b border-gray-300 flex px-6 py-2 ${
                      index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex-none bg-purple-700 w-12 h-12 rounded-full shadow-lg overflow-hidden mr-4">
                      <img
                        src={review.user.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="flex-1 text-font text-xl font-bold">{`${review.user.first_name} ${review.user.last_name}`}</h3>
                      <p className="text-base">{review.content}</p>
                      <p className="text-xs text-gray-500 mt-3">
                        {moment(review.created_at).fromNow()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <form
            className="w-full border-t border-gray-400 bg-white flex py-6 px-6 h-24"
            method="POST"
            onSubmit={sendComment}
          >
            <textarea
              placeholder="Escribe una reseña para el doctor..."
              className="flex-1 inline-block p-2 transition duration-300 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-transparent hover:border-purple-800 rounded "
              style={{ minHeight: '48px' }}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <button
              type="submit"
              className={`
                            inline-block px-4 py-2 transition duration-300 ease-in-out rounded cursor-pointer ml-2 h-12
                            ${
                              sendingComment
                                ? 'border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed'
                                : 'border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 bg-purple-600 text-white cursor-pointer'
                            }
                            `}
              disabled={sendingComment}
            >
              Comentar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
