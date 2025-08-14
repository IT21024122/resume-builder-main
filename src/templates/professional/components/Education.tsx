import { IEducation } from '@/stores/index.interface';
import { dateParser } from '@/helpers/utils';

export const Education = ({ education }: { education: IEducation[] }) => {
  return (
    <div className="flex flex-col gap-5">
      {education.map((item: IEducation, index: number) => {
        return (
          <div key={index}>
            <div>
              <p className="font-normal text-sm">
                {item.studyType} - {item.area}
              </p>
              <div className="flex justify-between font-normal text-xs">
                <p>{item.institution}</p>
                <p>
                  {`${dateParser(item.startDate)} - ${
                    item.isStudyingHere ? 'present' : dateParser(item.endDate)
                  }`}
                </p>
              </div>
              {item.results && item.results.length > 0 && (
                <ul className="text-xs mt-2 list-disc pl-5">
                  {item.results.map((r, i) => (
                    <li key={i}>
                      {r.subject} - {r.grade}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
