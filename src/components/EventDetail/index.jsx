export default function EventDetail({ isOpen, onClose, data }) {
  if (!isOpen) return null;
  return (
    <div
      className="bg-transparent w-[100vw] h-[100vh] fixed z-[1007]"
      onClick={onClose}
    >
      <div
        className="bg-white flex w-full h-[40rem] fixed z-[1008] bottom-0 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full overflow-auto px-6 pt-4">
          {data[0]?.fire_event_id && (
            <>
              <div className="font-semibold text-xl">Fire Event</div>
              <div className="text-left px-16">
                <div>Size: {data[0].size}</div>
                <div>Value: {data[0].value}</div>
              </div>
            </>
          )}
          {data[1]?.policy_id && (
            <>
              <div className="font-semibold text-xl">Policy</div>
              <div className="text-left px-16">
                <div>Name: {data[1].name}</div>
                <div>Brief: {data[1].brief}</div>
                {data[1].document && (
                  <div>
                    Link to file:{" "}
                    <a href={data[1].document} download>
                      Download
                    </a>
                  </div>
                )}
                {data[2].translate && (
                  <div>
                    Link to translated file:
                    <a href={data[1].translate} download>
                      Download
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
          {data[2]?.program_id && (
            <>
              <div className="font-semibold text-xl">Program</div>
              <div className="text-left px-16">
                <div>Name: {data[2].name}</div>
                <div>Budget: {data[2].budget}</div>
                <div>Scope: {data[2].scope}</div>
                {data[2].document && (
                  <div>
                    Link to file:{" "}
                    <a href={data[2].document} download>
                      Download
                    </a>
                  </div>
                )}
                {data[2].translate && (
                  <div>
                    Link to translated file:
                    <a href={data[2].translate} download>
                      Download
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
